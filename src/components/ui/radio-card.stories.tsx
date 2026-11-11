import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioCard } from "./radio-card";

const meta = {
  title: "UI/RadioCard",
  component: RadioCard,
  tags: ["autodocs"],
  args: {
    name: "booking-type",
    value: "whole-room",
    title: "Whole room",
    description: "One booking at a time",
    icon: "door",
    onChange: () => {},
  },
} satisfies Meta<typeof RadioCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: { checked: true },
};

export const Unselected: Story = {
  args: { checked: false },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true },
};

// export const RadioGroupTest: Story = {
//   render: () => (
//     <fieldset className="flex gap-4">
//       <legend className="mb-3">Choose booking type</legend>
//
//       <RadioCard
//         name="booking-test"
//         value="whole-room"
//         title="Whole room"
//         description="One booking at a time"
//         icon="door"
//       />
//
//       <RadioCard
//         name="booking-test"
//         value="single-seat"
//         title="Single seat"
//         description="Book one seat"
//         icon="door"
//       />
//     </fieldset>
//   ),
// };
