import type { Meta, StoryObj } from "@storybook/react-vite";
import TripSummary from "../components/Add-ons/TripSummary";
import { MantineProvider } from "@mantine/core";
import { mockDataForTripSummary } from "./mocks/bearStoreMock";
import { useBearStore } from "../store/store";

const meta = {
    title: "Components/TripSummary",
    component: TripSummary,
    decorators: [
        (Story) => {
            useBearStore.setState(mockDataForTripSummary);

            return (
                <MantineProvider>
                    <Story />
                </MantineProvider>
            );
        },
    ]
} satisfies Meta<typeof TripSummary>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: () => <TripSummary />
};