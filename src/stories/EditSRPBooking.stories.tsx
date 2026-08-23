import type { Meta, StoryObj } from "@storybook/react-vite";
import EditSRPBookingWidget from "../components/SRP/EditSRPBookingWidget";
import { MantineProvider } from "@mantine/core";

const meta = {
  component: EditSRPBookingWidget,
  title: "Components/EditSRPBooking",
  decorators: [
    (Story) => (
      <div>
        <MantineProvider>
          <Story />
        </MantineProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof EditSRPBookingWidget>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    departure_date: "12 Jul",
    destination_sector: "BOM",
    departure_sector: "DEL",
    destination_date: "N/A",
  },
};
