import type { Meta, StoryObj } from "@storybook/react-vite";
import { MantineProvider } from "@mantine/core";
import DestinationOffers from "../components/destinationOffers";

const meta = {
    component: DestinationOffers,
    title: "Components/DestinationOffers",
    parameters: {
        layout: "centered",
    },
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ]
} satisfies Meta<typeof DestinationOffers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
    }
}