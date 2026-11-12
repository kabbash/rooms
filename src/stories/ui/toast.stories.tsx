import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Toast,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastProvider,
  ToastSuccessIcon,
  ToastTitle,
  ToastViewport,
} from "../../components/ui/toast";
import { Icon } from "../../components/ui/icon";
function ToastDemo() {
  const [open, setOpen] = useState(false);

  return (
    <ToastProvider>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="rounded-md bg-brand px-4 py-2 text-label-md text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
      >
        Show Toast
      </button>

      <Toast
        open={open}
        onOpenChange={setOpen}
        duration={5000}
        className="rounded-lg border border-line-strong bg-inverse p-4 shadow-lg"
      >
        {" "}
        <ToastContent className="items-center">
          {" "}
          <ToastSuccessIcon />
          <div className="min-w-0 flex-1">
            <ToastTitle className="text-label-md text-fg-on-inverse">
              Room created successfully
            </ToastTitle>

            <ToastDescription className="mt-1 text-body-sm text-fg-on-inverse-muted">
              Your new room is ready to use.
            </ToastDescription>
          </div>
          <ToastClose
            aria-label="Close notification"
            className="inline-flex shrink-0 cursor-pointer items-center justify-center text-fg-on-inverse focus-visible:focus-ring"
          >
            <Icon name="x" size={16} />
          </ToastClose>
        </ToastContent>
      </Toast>

      <ToastViewport />
    </ToastProvider>
  );
}

const meta = {
  title: "UI/Toast",
  component: ToastDemo,
  tags: ["autodocs"],
} satisfies Meta<typeof ToastDemo>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Success: Story = {};
