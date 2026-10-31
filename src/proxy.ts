import { timingSafeEqual } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Temporary gate for the cloud dev and staging environments until RC Portal SSO lands.
 *
 * Active only when BASIC_AUTH_USER and BASIC_AUTH_PASSWORD are both set, so local
 * development is unaffected. Remove once real auth (domain/auth) is in place.
 */
export function proxy(request: NextRequest) {
  const user = process.env.BASIC_AUTH_USER;
  const password = process.env.BASIC_AUTH_PASSWORD;
  if (!user || !password) return NextResponse.next();

  const header = request.headers.get("authorization") ?? "";
  if (header.startsWith("Basic ")) {
    const decoded = Buffer.from(header.slice(6), "base64").toString("utf8");
    const sep = decoded.indexOf(":");
    if (sep !== -1 && same(decoded.slice(0, sep), user) && same(decoded.slice(sep + 1), password)) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Rooms", charset="UTF-8"' },
  });
}

function same(a: string, b: string): boolean {
  const x = Buffer.from(a);
  const y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

export const config = {
  // Everything except the health check and static assets.
  matcher: ["/((?!api/health|_next/static|_next/image|favicon.ico).*)"],
};
