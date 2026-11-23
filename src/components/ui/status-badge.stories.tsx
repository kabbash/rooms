import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StatusBadge } from "./status-badge";

const meta = {
  title: "UI/StatusBadge",
  component: StatusBadge,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof StatusBadge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Available: Story = {
  args: {
    status: "available",
  },
};
export const Booked: Story = {
  args: {
    status: "booked",
  },
};

export const FewSeats: Story = {
  args: {
    status: "fewSeats",
  },
};

export const Yours: Story = {
  args: {
    status: "yourBooking",
  },
};

export const CustomLabel: Story = {
  args: {
    status: "available",
    children: "4/10 free",
  },
};
