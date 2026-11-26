import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import { BookingRow } from "../../components/bookings/booking-row";

const meta = {
  title: "Bookings/BookingRow",
  component: BookingRow,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A responsive booking component that displays as a card on mobile and a row on desktop.",
      },
    },
  },
} satisfies Meta<typeof BookingRow>;

export default meta;

type Story = StoryObj<typeof meta>;

const defaultArgs = {
  room: "Khartoum",
  location: "Maadi-2-4 Office. Floor 2",
  date: "Monday, 16 November",
  time: "10:00 - 11:00",
  icon: "room" as const,
  synced: true,
  onChange: fn(),
  onCancel: fn(),
};

export const UpcomingMobile: Story = {
  args: {
    ...defaultArgs,
    state: "upcoming",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile390",
    },
  },
};

export const PastMobile: Story = {
  args: {
    ...defaultArgs,
    state: "past",
  },
  parameters: {
    viewport: {
      defaultViewport: "mobile390",
    },
  },
};

export const UpcomingDesktop: Story = {
  args: {
    ...defaultArgs,
    state: "upcoming",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop1440",
    },
  },
};

export const PastDesktop: Story = {
  args: {
    ...defaultArgs,
    state: "past",
  },
  parameters: {
    viewport: {
      defaultViewport: "desktop1440",
    },
  },
};
