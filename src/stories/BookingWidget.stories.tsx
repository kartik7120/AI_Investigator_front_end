import type { Meta, StoryObj } from "@storybook/react-vite";
import BookingWidget from "./BookingWidget";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';
const queryClient = new QueryClient();

const meta = {
    component: BookingWidget,
    title: "Components/BookingWidget",
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <MantineProvider forceColorScheme="dark">
                    <Story />
                </MantineProvider>
            </QueryClientProvider>
        )
    ]

} satisfies Meta<typeof BookingWidget>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {

}