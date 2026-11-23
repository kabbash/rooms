import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BottomTabBar } from "@/components/ui/bottom-tab-bar";

const meta = {
  title: "UI/BottomTabBar",
  component: BottomTabBar,
  parameters: {
    layout: "fullscreen",
  },
  globals: {
    viewport: { value: "mobile", isRotated: false },
  },
  tags: ["autodocs"],
  argTypes: {
    active: {
      control: "select",
      options: ["rooms", "myBookings"],
    },
  },
} satisfies Meta<typeof BottomTabBar>;

export default meta;

type Story = StoryObj<typeof meta>;

export const RoomsActive: Story = {
  args: {
    active: "rooms",
    portalUrl: "https://remotecoders.org/portal",
  },
};

export const MyBookingsActive: Story = {
  args: {
    active: "myBookings",
    portalUrl: "https://remotecoders.org/portal",
  },
};
