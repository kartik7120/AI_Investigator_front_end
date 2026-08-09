import type { Meta, StoryObj } from "@storybook/react-vite";
import BookingWidget from "./BookingWidget";
import { MantineProvider } from "@mantine/core";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router"; // Use "react-router-dom" if your project demands it

// Import styles safely
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/carousel/styles.css';
import { Notifications } from "@mantine/notifications";
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
const queryClient = new QueryClient();

const meta = {
    // 1. We remove `component: BookingWidget` here to stop Storybook from 
    // trying to render it naked outside our decorator contexts.
    title: "Components/BookingWidget",
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <MantineProvider forceColorScheme="dark">
                    <Notifications position="top-right" />
                    <MemoryRouter initialEntries={["/"]}>
                        <Story />
                    </MemoryRouter>
                </MantineProvider>
            </QueryClientProvider>
        )
    ]
} satisfies Meta<typeof BookingWidget>; // Removed generic type mapping to prevent early execution

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    // 2. We explicitly mount the component inside the active story lifecycle handler
    render: () => <BookingWidget />
};
