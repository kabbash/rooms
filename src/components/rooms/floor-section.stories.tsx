import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FloorSection } from "./floor-section";

const meta = {
  title: "Rooms/FloorSection",
  component: FloorSection,
  tags: ["autodocs"],
} satisfies Meta<typeof FloorSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    floor: {
      floorNumber: 2,
      rooms: [
        {
          id: "room-1",
          code: "Maadi Office-2-1",
          displayName: "Cairo",
          capacityLabel: "Up to 9 people",
          bookingType: "WHOLE_ROOM",
        },
        {
          id: "room-2",
          code: "Maadi Office-2-2",
          displayName: "Sanaa",
          capacityLabel: "Up to 5 people",
          bookingType: "WHOLE_ROOM",
        },
      ],
    },
  },
};
