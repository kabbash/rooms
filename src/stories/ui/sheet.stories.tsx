import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  Sheet,
  SheetBody,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../../components/ui/sheet";

const meta = {
  title: "UI/Sheet",
  component: Sheet,
  tags: ["autodocs"],
} satisfies Meta<typeof Sheet>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <button
          type="button"
          className="rounded-md bg-brand px-4 py-2 text-label-md text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
        >
          Open Sheet
        </button>
      </SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-h2 text-fg">Booking details</SheetTitle>

          <SheetDescription className="text-body-sm text-fg-secondary">
            Review the details before confirming your booking.
          </SheetDescription>
        </SheetHeader>

        <SheetBody>
          <div className="space-y-4">
            {Array.from({ length: 12 }, (_, index) => (
              <div
                key={index}
                className="rounded-md border border-line bg-subtle p-4"
              >
                <p className="text-label-md text-fg">Section {index + 1}</p>
                <p className="mt-1 text-body-sm text-fg-secondary">
                  This content helps us test scrolling inside the sheet.
                </p>
              </div>
            ))}
          </div>
        </SheetBody>

        <SheetFooter>
          <SheetClose asChild>
            <button
              type="button"
              className="rounded-md border border-line-strong px-4 py-2 text-label-md text-fg hover:bg-subtle focus-visible:focus-ring"
            >
              Cancel
            </button>
          </SheetClose>

          <SheetClose asChild>
            <button
              type="button"
              className="rounded-md bg-brand px-4 py-2 text-label-md text-fg-on-brand hover:bg-brand-hover focus-visible:focus-ring"
            >
              Confirm
            </button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
