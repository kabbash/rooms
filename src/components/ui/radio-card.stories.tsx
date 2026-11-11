import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RadioCard } from "./radio-card";


function DoorIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="size-5"
    >
      <path
        d="M10.8334 3.3335H13.3334C13.7754 3.3335 14.1993 3.50909 14.5119 3.82165C14.8244 4.13421 15 4.55814 15 5.00016V16.6668"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.66663 16.6667H4.16663M10.8333 16.6667H18.3333M8.33329 10V10.0083"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.8333 3.80014V17.2668C10.8328 17.3327 10.8167 17.3975 10.7863 17.456C10.7559 17.5145 10.7121 17.5649 10.6584 17.6031C10.6047 17.6413 10.5427 17.6663 10.4775 17.6759C10.4123 17.6855 10.3458 17.6796 10.2833 17.6585L6.11666 16.2668C6.00349 16.1718 5.91761 16.0484 5.86783 15.9093C5.81804 15.7702 5.80613 15.6204 5.83333 15.4751V4.52514C5.8334 4.35388 5.88624 4.1868 5.98465 4.04663C6.08306 3.90647 6.22227 3.80003 6.38333 3.7418L10.55 2.35014C10.6452 2.33153 10.7431 2.33186 10.8382 2.35111C10.9333 2.37036 11.0237 2.40814 11.1041 2.46231C11.1846 2.51648 11.2536 2.58597 11.3073 2.66681C11.3609 2.74765 11.3981 2.83826 11.4167 2.93347C11.4353 3.02868 11.4349 3.12662 11.4157 3.2217C11.3964 3.31678 11.3587 3.40714 11.3045 3.48762C11.2503 3.56809 11.1808 3.63711 11.1 3.69074C11.0191 3.74436 10.9285 3.78153 10.8333 3.80014Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const meta = {
  title: "UI/RadioCard",
  component: RadioCard,
  tags: ["autodocs"],
  args: {
    name: "booking-type",
    value: "whole-room",
    title: "Whole room",
    description: "One booking at a time",
    icon: <DoorIcon />,
    onChange: () => {},
  },
} satisfies Meta<typeof RadioCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  args: { checked: true },
};

export const Unselected: Story = {
  args: { checked: false },
};

export const Disabled: Story = {
  args: { checked: false, disabled: true },
};

// export const RadioGroupTest: Story = {
//   render: () => (
//     <fieldset className="flex gap-4">
//       <legend className="mb-3">Choose booking type</legend>

//       <RadioCard
//         name="booking-test"
//         value="whole-room"
//         title="Whole room"
//         description="One booking at a time"
//         icon={<DoorIcon />}
//       />

//       <RadioCard
//         name="booking-test"
//         value="single-seat"
//         title="Single seat"
//         description="Book one seat"
//         icon={<DoorIcon />}
//       />
//     </fieldset>
//   ),
// };
