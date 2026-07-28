import type { Meta, StoryObj } from "@storybook/react-vite";
import BookingWidget from "./BookingWidget";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
                <MantineProvider>
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