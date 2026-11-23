import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MobileTopBar } from "@/components/ui/mobile-top-bar";

const meta = {
  title: "UI/MobileTopBar",
  component: MobileTopBar,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof MobileTopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    user: {
      name: "Ahmed Kabbash",
      avatar: undefined,
    },
  },
};
