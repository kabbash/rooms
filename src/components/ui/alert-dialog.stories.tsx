import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./alert-dialog";

const meta = {
  title: "UI/AlertDialog",
  component: AlertDialog,
  tags: ["autodocs"],
} satisfies Meta<typeof AlertDialog>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DeleteRoom: Story = {
  render: () => (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          type="button"
          className="rounded-md bg-brand px-4 py-2 text-label-md text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
        >
          Delete room
        </button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-h2 text-fg">
            Delete this room?
          </AlertDialogTitle>

          <AlertDialogDescription className="text-body-sm text-fg-secondary">
            This action cannot be undone. The room will be permanently deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6">
          <AlertDialogCancel asChild>
            <button
              type="button"
              className="rounded-md border border-line-strong px-4 py-2 text-label-md text-fg hover:bg-subtle focus-visible:focus-ring"
            >
              Cancel
            </button>
          </AlertDialogCancel>

          <AlertDialogAction asChild>
            <button
              type="button"
              className="rounded-md border border-line-danger bg-danger-subtle px-4 py-2 text-label-md text-fg-danger hover:opacity-90 focus-visible:focus-ring"
            >
              Delete room
            </button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
};
