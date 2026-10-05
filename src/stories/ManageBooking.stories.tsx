import type { Meta, StoryObj } from "@storybook/react-vite";
import ManageBookingPage from "../components/manage/ManageBookingPage";
import { MantineProvider } from "@mantine/core";

const meta = {

    component: ManageBookingPage,
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ]
} satisfies Meta<typeof ManageBookingPage>;

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {

}