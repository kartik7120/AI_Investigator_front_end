import type { Meta } from "@storybook/react-vite";
import Navbar from "../components/navbar";
import { MantineProvider } from '@mantine/core';
import '../tailwind.css';
import '@mantine/core/styles.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const meta: Meta<typeof Navbar> = {
    component: Navbar,
    title: "Components/Navbar",
    parameters: {
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
}

export default meta;

type Story = typeof meta;

export const Default: Story = {
}
