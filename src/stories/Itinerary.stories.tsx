import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";

import ItineraryPage from "../components/manage/itinerary";

import type { Flight } from "../utils/useFulInterfaces";
import { MantineProvider } from "@mantine/core";

const mockFlight: Flight = {
    id: 51,

    flightNumber: "6E 217",

    departureSector: "DEL",
    destinationSector: "BLR",

    departureTime: "2026-10-14T08:30:00",
    arrivalTime: "2026-10-14T10:45:00",

    status: "On Time",

    fareType: "ECONOMY",

    currentPrice: [
        {
            fareType: "ECONOMY",
            basePrice: 5499,
            currentPrice: 6999,
        },
        {
            fareType: "PREMIUM_ECONOMY",
            basePrice: 7499,
            currentPrice: 8999,
        },
        {
            fareType: "BUSINESS",
            basePrice: 11999,
            currentPrice: 13999,
        },
    ],

    basePrice: [
        {
            fareType: "ECONOMY",
            basePrice: 5499,
            currentPrice: 6999,
        },
        {
            fareType: "PREMIUM_ECONOMY",
            basePrice: 7499,
            currentPrice: 8999,
        },
        {
            fareType: "BUSINESS",
            basePrice: 11999,
            currentPrice: 13999,
        },
    ],

    baggageAllowance: [
        {
            fareType: "DOMESTIC_ECONOMY",
            cabinBaggageAllowance: 7,
            checkInBaggageAllowance: 15,
        },
        {
            fareType: "DOMESTIC_PREMIUM_ECONOMY",
            cabinBaggageAllowance: 10,
            checkInBaggageAllowance: 25,
        },
        {
            fareType: "DOMESTIC_BUSINESS",
            cabinBaggageAllowance: 10,
            checkInBaggageAllowance: 40,
        },
    ],

    seatMap: [
        {
            id: 1,
            seatNumber: "12A",
            seatClass: "ECONOMY",
            status: "OCCUPIED",
            flight: {} as Flight,
        },
        {
            id: 2,
            seatNumber: "12B",
            seatClass: "ECONOMY",
            status: "OCCUPIED",
            flight: {} as Flight,
        },
        {
            id: 3,
            seatNumber: "12C",
            seatClass: "ECONOMY",
            status: "AVAILABLE",
            flight: {} as Flight,
        },
    ],
};

const meta = {
    title: "Pages/Itinerary/ItineraryPage",

    component: ItineraryPage,

    parameters: {
        layout: "fullscreen",

        docs: {
            description: {
                component:
                    "Displays a complete flight itinerary including flight details, passengers, assigned seats, baggage, fare information, payment details and booking actions.",
            },
        },
    },

    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ],

    tags: ["autodocs"],

    argTypes: {
        totalPaid: {
            control: "number",
        },

        bookingReference: {
            control: "text",
        },

        terminal: {
            control: "text",
        },

        gate: {
            control: "text",
        },

        bookedOn: {
            control: "text",
        },
    },

    args: {
        onBack: fn(),
        onDownload: fn(),
        onCancel: fn(),
    },
} satisfies Meta<typeof ItineraryPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/* -------------------------------------------------------------------------- */
/* Default                                                                    */
/* -------------------------------------------------------------------------- */

export const Default: Story = {
    args: {
        flight: mockFlight,

        bookingReference: "6E8F3K",

        bookedOn: "12 Aug 2026, 10:24 AM",

        totalPaid: 6999,

        terminal: "T3",

        gate: "A12",

        passengers: [
            {
                id: 1,
                name: "Kartik Shukla",
                seat: "12A",
                fareType: "ECONOMY",
            },
        ],
    },
};

/* -------------------------------------------------------------------------- */
/* Multiple Passengers                                                        */
/* -------------------------------------------------------------------------- */

export const MultiplePassengers: Story = {
    args: {
        flight: mockFlight,

        bookingReference: "7XK92P",

        bookedOn: "06 Oct 2026, 09:30 AM",

        totalPaid: 13998,

        terminal: "T3",

        gate: "B18",

        passengers: [
            {
                id: 1,
                name: "Kartik Shukla",
                seat: "12A",
                fareType: "ECONOMY",
            },
            {
                id: 2,
                name: "Rahul Sharma",
                seat: "12B",
                fareType: "ECONOMY",
            },
        ],
    },
};

/* -------------------------------------------------------------------------- */
/* Premium Economy                                                            */
/* -------------------------------------------------------------------------- */

export const PremiumEconomy: Story = {
    args: {
        flight: {
            ...mockFlight,
            fareType: "PREMIUM_ECONOMY",
        },

        bookingReference: "PE92LK",

        bookedOn: "06 Oct 2026, 09:45 AM",

        totalPaid: 8999,

        terminal: "T3",

        gate: "C05",

        passengers: [
            {
                id: 1,
                name: "Kartik Shukla",
                seat: "8A",
                fareType: "PREMIUM_ECONOMY",
            },
        ],
    },
};

/* -------------------------------------------------------------------------- */
/* Cancelled Flight                                                           */
/* -------------------------------------------------------------------------- */

export const CancelledFlight: Story = {
    args: {
        flight: {
            ...mockFlight,
            status: "Cancelled",
        },

        bookingReference: "CN82KD",

        bookedOn: "04 Oct 2026, 02:15 PM",

        totalPaid: 6999,

        terminal: "T3",

        gate: "A12",

        passengers: [
            {
                id: 1,
                name: "Kartik Shukla",
                seat: "12A",
                fareType: "ECONOMY",
            },
        ],
    },
};

/* -------------------------------------------------------------------------- */
/* Seat Not Assigned                                                          */
/* -------------------------------------------------------------------------- */

export const SeatNotAssigned: Story = {
    args: {
        flight: mockFlight,

        bookingReference: "NS72PL",

        bookedOn: "06 Oct 2026, 08:15 AM",

        totalPaid: 6499,

        terminal: "T3",

        gate: "D21",

        passengers: [
            {
                id: 1,
                name: "Kartik Shukla",
                seat: undefined,
                fareType: "ECONOMY",
            },
        ],
    },
};

