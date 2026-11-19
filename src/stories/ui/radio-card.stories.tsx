import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioCard } from "../../components/ui/radio-card";

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
