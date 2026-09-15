import type { Meta, StoryObj } from "@storybook/react-vite";
import { MantineProvider } from "@mantine/core";
import { useBearStore } from "../store/store";
import { mockBearState, mockDataForTripSummary } from "./mocks/bearStoreMock";
// import Demo from "../components/Add-ons/TestAddons";
import AddOnPageTabs from "../components/Add-ons/AddOnPageTabs";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta = {
    component: AddOnPageTabs,
    title: "components/AddOnPageTabs",
    decorators: [
        (Story) => {

            useBearStore.setState(mockBearState);
            useBearStore.setState(mockDataForTripSummary);

            return (
                <QueryClientProvider client={queryClient}>
                    <MantineProvider>
                        <Story />
                    </MantineProvider>
                </QueryClientProvider>
            )
        }
    ],
} satisfies Meta<typeof AddOnPageTabs>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
}