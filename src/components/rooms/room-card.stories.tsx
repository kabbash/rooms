import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RoomCard } from "./room-card";

const meta = {
  title: "Rooms/RoomCard",
  component: RoomCard,
  tags: ["autodocs"],
} satisfies Meta<typeof RoomCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WholeRoom: Story = {
  args: {
    room: {
      id: "room-1",
      code: "Maadi Office-2-1",
      displayName: "Cairo",
      capacityLabel: "Up to 9 people",
      bookingType: "WHOLE_ROOM",
    },
  },
};

export const SeatLevel: Story = {
  args: {
    room: {
      id: "room-2",
      code: "Silent Room",
      displayName: "Silent Room",
      capacityLabel: "10 seats",
      bookingType: "SEAT_LEVEL",
    },
  },
};

export const SingleOccupant: Story = {
  args: {
    room: {
      id: "room-3",
      code: "Silent Box 1",
      displayName: "Silent Box 1",
      capacityLabel: "1 person",
      bookingType: "SINGLE_OCCUPANT",
    },
  },
};
