import type { Meta, StoryObj } from "@storybook/react-vite";
import HomePage from "../components/HomePage";
import { MantineProvider } from "@mantine/core";
import { QueryClient } from "@tanstack/query-core";
import { QueryClientProvider } from "@tanstack/react-query";
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';

const queryClient = new QueryClient();

const meta = {
    component: HomePage,
    title: "Component/HomePage",
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
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {

}