import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Avatar } from "./avatar";

const meta = {
  title: "UI/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Avatar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { name: "Madonna Melad", size: 40 },
};

export const Small: Story = {
  args: { name: "Sara Ali", size: 24 },
};

export const Medium: Story = {
  args: { name: "Omar Ahmed", size: 32 },
};

export const Large: Story = {
  args: { name: "Mona Hassan", size: 56 },
};

export const WithImage: Story = {
  args: {
    name: "Madonna Melad",
    size: 56,
    src: "https://i.pravatar.cc/150?img=47",
  },
};
