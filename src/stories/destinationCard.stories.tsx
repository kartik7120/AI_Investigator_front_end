import type { Meta, StoryObj } from "@storybook/react-vite";
import DestinationCard from "../components/destinationCard";
import { MantineProvider } from "@mantine/core";

const meta = {
    component: DestinationCard,
    title: "Components/DestinationCard",
    parameters: {
        layout: "centered",
    },
    decorators: (
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    )
} satisfies Meta<typeof DestinationCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        destination: {
            bookingUntil: "31st December 2023",
            cabin: "Economy",
            city: "New York",
            country: "USA",
            id: 1,
            price: "$499",
            image: "https://images.unsplash.com/photo-1549924231-f129b911e442?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
        }
    }
}
