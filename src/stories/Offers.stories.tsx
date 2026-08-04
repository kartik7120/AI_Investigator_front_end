import type { Meta, StoryObj } from "@storybook/react-vite";
import Offers from "../components/Offers";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';

const meta = {
    component: Offers,
    title: "components/Offers",
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        ),
    ]
} satisfies Meta<typeof Offers>;

export default meta;

type St = StoryObj<typeof meta>;

export const Default: St = {
    args: {},
};