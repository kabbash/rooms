# Cloud setup (one time)

How to create the dev and staging environments from scratch. Why it looks like this: [ADR 0003](../adr/0003-hosting-and-delivery.md).

You need: a Google account with billing, the [gcloud CLI](https://cloud.google.com/sdk/docs/install),
a [Neon](https://neon.tech) account, and admin on the GitHub repo. Takes about 30 minutes.

```bash
# Values used throughout. PROJECT_ID must be globally unique.
PROJECT_ID=rc-rooms
REGION=europe-west3                # Frankfurt (next to Neon's aws-eu-central-1)
REPO=kabbash/rooms                 # GitHub owner/repo
gcloud auth login
```

## 1. Google Cloud project and budget alert

```bash
gcloud projects create "$PROJECT_ID" --name="RC Rooms"
gcloud billing accounts list                         # copy the ACCOUNT_ID
BILLING=XXXXXX-XXXXXX-XXXXXX
gcloud billing projects link "$PROJECT_ID" --billing-account="$BILLING"
gcloud config set project "$PROJECT_ID"

gcloud services enable \
  run.googleapis.com artifactregistry.googleapis.com secretmanager.googleapis.com \
  iam.googleapis.com iamcredentials.googleapis.com sts.googleapis.com \
  cloudresourcemanager.googleapis.com billingbudgets.googleapis.com

# Email alert at 50% and 100% of $10/month, so nothing surprises you.
gcloud billing budgets create --billing-account="$BILLING" \
  --display-name="rooms" --budget-amount=10USD \
  --threshold-rule=percent=0.5 --threshold-rule=percent=1.0 \
  --filter-projects="projects/$PROJECT_ID"
```

## 2. Artifact Registry (Docker images)

```bash
gcloud artifacts repositories create rooms --repository-format=docker --location="$REGION"

# Keep the 20 newest images; delete anything older than 30 days beyond that.
cat > /tmp/cleanup.json <<'EOF'
[
  { "name": "keep-recent", "action": { "type": "Keep" }, "mostRecentVersions": { "keepCount": 20 } },
  { "name": "delete-old",  "action": { "type": "Delete" }, "condition": { "tagState": "any", "olderThan": "30d" } }
]
EOF
gcloud artifacts repositories set-cleanup-policies rooms --location="$REGION" \
  --policy=/tmp/cleanup.json --no-dry-run
```

## 3. Service accounts

`rooms-runtime` is who the app runs as. `rooms-deployer` is who GitHub Actions acts as.

```bash
gcloud iam service-accounts create rooms-runtime  --display-name="Rooms: Cloud Run runtime"
gcloud iam service-accounts create rooms-deployer --display-name="Rooms: GitHub Actions deployer"
RUNTIME_SA="rooms-runtime@$PROJECT_ID.iam.gserviceaccount.com"
DEPLOYER_SA="rooms-deployer@$PROJECT_ID.iam.gserviceaccount.com"

# Runtime: read its own secrets.
gcloud projects add-iam-policy-binding "$PROJECT_ID" --condition=None \
  --member="serviceAccount:$RUNTIME_SA" --role=roles/secretmanager.secretAccessor

# Deployer: deploy Cloud Run, push images, read the migration DB URL, act as the runtime SA.
for role in roles/run.admin roles/artifactregistry.writer roles/secretmanager.secretAccessor; do
  gcloud projects add-iam-policy-binding "$PROJECT_ID" --condition=None \
    --member="serviceAccount:$DEPLOYER_SA" --role="$role"
done
gcloud iam service-accounts add-iam-policy-binding "$RUNTIME_SA" \
  --member="serviceAccount:$DEPLOYER_SA" --role=roles/iam.serviceAccountUser
```

## 4. Let GitHub Actions log in without keys (Workload Identity Federation)

Only workflows from this repo, running on `main` or a `v*` tag, can get a token.
Workflows on feature branches and pull requests can't deploy.

```bash
gcloud iam workload-identity-pools create github --location=global --display-name="GitHub Actions"

gcloud iam workload-identity-pools providers create-oidc rooms-repo \
  --location=global --workload-identity-pool=github --display-name="$REPO" \
  --issuer-uri="https://token.actions.githubusercontent.com" \
  --attribute-mapping="google.subject=assertion.sub,attribute.repository=assertion.repository,attribute.ref=assertion.ref" \
  --attribute-condition="assertion.repository=='$REPO' && (assertion.ref=='refs/heads/main' || assertion.ref.startsWith('refs/tags/v'))"

POOL=$(gcloud iam workload-identity-pools describe github --location=global --format='value(name)')
gcloud iam service-accounts add-iam-policy-binding "$DEPLOYER_SA" \
  --role=roles/iam.workloadIdentityUser \
  --member="principalSet://iam.googleapis.com/$POOL/attribute.repository/$REPO"

# → GitHub variable GCP_WIF_PROVIDER
gcloud iam workload-identity-pools providers describe rooms-repo \
  --location=global --workload-identity-pool=github --format='value(name)'
```

> Moving the repo to an organization later: update `--attribute-condition` with
> `gcloud iam workload-identity-pools providers update-oidc …` and re-run the
> `add-iam-policy-binding` above with the new `owner/repo`.

## 5. Neon databases

1. Create a project **rooms**: Postgres 17, region **AWS Europe Central 1 (Frankfurt)**.
2. Under **Branches**, create **`dev`** and **`staging`** from `main`. Leave `main` empty for production later.
3. For each branch, open **Connect** and copy two connection strings:
   - **Pooled** (host contains `-pooler`): used by the app at runtime.
   - **Direct** (pooling toggled off): used by `prisma migrate deploy`.

   If connections fail with a channel-binding error, delete `&channel_binding=require` from the URL.

## 6. Secrets (Google Secret Manager)

Repeat for `ENV=dev` and `ENV=staging`. Pasting with `read -s` keeps the URLs out of your shell history.

```bash
ENV=dev

read -rs -p "Pooled URL: " URL && printf '%s' "$URL" | \
  gcloud secrets create "rooms-$ENV-database-url" --data-file=- ; echo
read -rs -p "Direct URL: " URL && printf '%s' "$URL" | \
  gcloud secrets create "rooms-$ENV-database-url-direct" --data-file=- ; echo

# Basic-auth password for the environment. Share it with the team / PO.
openssl rand -base64 18 | tr -d '\n' | gcloud secrets create "rooms-$ENV-basic-auth-password" --data-file=-
gcloud secrets versions access latest --secret="rooms-$ENV-basic-auth-password"; echo
```

To rotate a value later: `printf '%s' "$NEW" | gcloud secrets versions add <name> --data-file=-`, then redeploy.

## 7. GitHub

**Settings → Secrets and variables → Actions → Variables** (repository variables, not secrets):

| Variable | Value |
|---|---|
| `GCP_PROJECT_ID` | `rc-rooms` |
| `GCP_REGION` | `europe-west3` |
| `GCP_WIF_PROVIDER` | output of step 4, `projects/…/providers/rooms-repo` |
| `GCP_DEPLOYER_SA` | `rooms-deployer@rc-rooms.iam.gserviceaccount.com` |
| `GCP_RUNTIME_SA` | `rooms-runtime@rc-rooms.iam.gserviceaccount.com` |
| `BASIC_AUTH_USER` | *(optional, default `remotecoders`)* |

**Settings → Environments:**

- **`dev`**: Deployment branches and tags → *Selected* → `main`.
- **`staging`**: Required reviewers → you (and the PO, if they're a collaborator).
  Deployment branches and tags → `main` and tag pattern `v*`.

> Required reviewers are free on **public** repos. On a **private** repo with a free personal
> account they need GitHub Pro. Without them, the manual "Run workflow" button is still the gate.

**Settings → Rules → Rulesets** → new branch ruleset for `main`: require a pull request and the
status check **Lint, typecheck, test, build**.

## 8. First deploy

1. Merge to `main` (or **Actions → Deploy dev → Run workflow**). The first run creates the
   `rooms-dev` service and, because the database is empty, seeds it. Later deploys only run
   migrations; data the team enters on dev is kept.
2. The run summary shows the URL. Open it and log in with `BASIC_AUTH_USER` and the password from step 6.
3. **Actions → Promote to staging → Run workflow** creates `rooms-staging`.

## Day-to-day

| I want to… | Do this |
|---|---|
| Ship to dev | Merge a PR to `main` |
| Ship to staging | Actions → *Promote to staging* → Run (or `git tag v0.x.0 && git push --tags`) |
| Re-seed dev (keeps other data) | Actions → *Dev database* → Run workflow → **seed** |
| Wipe dev and start fresh | Actions → *Dev database* → Run workflow → **reset**, type `dev` to confirm |
| Roll back | Cloud Run console → service → Revisions → route 100% to the previous one |
| See logs | Cloud Run console → service → **Logs** |
| Check health | `curl https://<service-url>/api/health` |
