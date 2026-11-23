import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { IconButton } from "../../components/ui/icon-button";

const meta = {
  title: "UI/IconButton",
  component: IconButton,
  tags: ["autodocs"],
  argTypes: {
    icon: {
      control: false,
    },
    "aria-label": {
      control: "text",
    },
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Neutral: Story = {
  args: {
    icon: "pencil",
    "aria-label": "Edit",
    variant: "neutral",
  },
};

export const Danger: Story = {
  args: {
    icon: "trash",
    "aria-label": "Delete",
    variant: "danger",
  },
};

export const Disabled: Story = {
  args: {
    icon: "pencil",
    "aria-label": "Edit",
    variant: "neutral",
    disabled: true,
  },
};
export const Hide: Story = {
  args: {
    icon: "eye-off",
    "aria-label": "Hide",
    variant: "neutral",
  },
};
