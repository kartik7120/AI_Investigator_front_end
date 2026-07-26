import type { Meta, StoryObj } from "@storybook/react-vite";
import BookingWidget from "./BookingWidget";
import { MantineProvider } from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

const meta = {
    component: BookingWidget,
    title: "Components/BookingWidget",
    parameters: {
        layout: "fullscreen",
    },
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ]

} satisfies Meta<typeof BookingWidget>;

export default meta;

type Story = StoryObj<typeof meta>;


export const Default: Story = {

}