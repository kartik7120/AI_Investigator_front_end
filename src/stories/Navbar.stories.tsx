import type { Meta } from "@storybook/react-vite";
import Navbar from "../components/navbar";
import { MantineProvider } from '@mantine/core';
import '../tailwind.css';
import '@mantine/core/styles.css';

const meta: Meta<typeof Navbar> = {
    component: Navbar,
    title: "Components/Navbar",
    parameters: {
    },
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ]
}

export default meta;

type Story = typeof meta;

export const Default: Story = {
}
