import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TextInput } from "@/components/ui/text-input";

const meta = {
  title: "UI/TextInput",
  component: TextInput,
  tags: ["autodocs"],
  args: {
    label: "Room name",
    placeholder: "Cairo",
    helper: "Shown on cards and in Google Calendar",
  },
} satisfies Meta<typeof TextInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Error: Story = {
  args: {
    error: "A room with this name already exists",
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    value: "Cairo",
  },
};
