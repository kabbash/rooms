import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Icon } from "@/components/ui/icon";
import { RoomCard } from "../../components/rooms/room-card";

const meta = {
  title: "Rooms/RoomCard",
  component: RoomCard,
  tags: ["autodocs"],
} satisfies Meta<typeof RoomCard>;

export default meta;

type Story = StoryObj<typeof meta>;

const cairoRoom = {
  id: "room-1",
  code: "Maadi Office-2-1",
  displayName: "Cairo",
  capacityLabel: "Up to 9 people",
  bookingType: "WHOLE_ROOM" as const,
};

const equipment = [
  { icon: <Icon name="monitor" size={16} />, label: "Monitor" },
  { icon: <Icon name="plug" size={16} />, label: "HDMI" },
  { icon: <Icon name="presentation" size={16} />, label: "Whiteboard" },
];

export const Available: Story = {
  args: {
    room: cairoRoom,
    state: "available",
    equipment,
    floor: 2,
    freeUntil: "14:00",
  },
};

export const Booked: Story = {
  args: {
    room: cairoRoom,
    state: "booked",
    equipment,
    floor: 2,
    booking: {
      holder: "Saria AlAbbar",
      start: "10:00",
      end: "11:30",
      duration: "1h 30m",
    },
    nextFreeAt: "11:30",
  },
};

export const YourBooking: Story = {
  args: {
    room: cairoRoom,
    state: "yours",
    equipment,
    floor: 2,
    booking: {
      holder: "You",
      avatarName: "Alex Kamel", // mock name, gives the "AK" initials
      start: "13:00",
      end: "14:00",
      duration: "1h",
    },
  },
};

export const SilentBox: Story = {
  args: {
    room: {
      id: "room-3",
      code: "Silent Box 1",
      displayName: "Silent Box 1",
      capacityLabel: "1 person",
      bookingType: "SINGLE_OCCUPANT" as const,
    },
    state: "available",
    floor: 2,
    icon: "seat",
    freeUntil: "14:00",
  },
};

export const LongName: Story = {
  args: {
    room: {
      ...cairoRoom,
      displayName: "Cairo Meeting Room - Long Name Example",
    },
    state: "available",
    equipment,
    floor: 2,
    freeUntil: "14:00",
  },
};
