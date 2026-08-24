import type { Meta, StoryObj } from "@storybook/react-vite";
import SRPFareDropdown from "../components/SRP/SRPFareDropdown";
import type { Fare } from "../components/SRP/SRPFareCard";
import { MantineProvider } from "@mantine/core";

const meta = {
  title: "components/SRPFareDropdown",
  component: SRPFareDropdown,
  decorators: [
    (Story) => (
      <div>
        <MantineProvider>
          <Story />
        </MantineProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof SRPFareDropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

const fares: Fare[] = [
  {
    name: "Economy Saver",
    price: 2000,
    baggage: "15 kg",
    changeFee: "₹3,000",
    cancellationFee: "₹4,000",
    miles: "500 miles",
    lowestPrice: true,
    FareType: "ECONOMY",
    cabinBaggageAllowance: "7 kg",
  },
  {
    name: "Economy Flex",
    price: 3500,
    baggage: "20 kg",
    changeFee: "₹1,500",
    cancellationFee: "₹2,000",
    miles: "750 miles",
    FareType: "ECONOMY",
    cabinBaggageAllowance: "7 kg",
  },
  {
    name: "Business",
    price: 6500,
    baggage: "35 kg",
    changeFee: "Free",
    cancellationFee: "₹1,000",
    miles: "1,500 miles",
    FareType: "BUSINESS",
    cabinBaggageAllowance: "10 kg",
  },
];

export const Default: Story = {
  args: {
    arrival_time: "14:05",
    departure_time: "12:05",
    departure_city: "Kanpur",
    destination_city: "Delhi",
    departure_date: "12 Jul",
    departure_sector: "KNP",
    destination_sector: "DEL",
    duration: "2 hrs",
    FlightNumbers: "FN-2025, FN-5683",
    lowest_price: 2000,
    fares,
  },
};
