import type { Meta, StoryObj } from "@storybook/react-vite";
import FareCard from "../components/SRP/FareCard";
import { MantineProvider } from "@mantine/core";

const meta = {
  component: FareCard,
  title: "Components/FareCard",
  decorators: [
    (Story) => (
      <div>
        <MantineProvider>
          <Story />
        </MantineProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof FareCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    fare: {
      baggage: "30kg",
      changeFee: "3000",
      miles: "2.5 Miles",
      name: "Economy",
      price: 5000,
      cancellationFee: "2000",
      lowestPrice: true,
    },
  },
};
