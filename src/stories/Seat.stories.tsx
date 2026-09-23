import type { Meta, StoryObj } from "@storybook/react-vite";
import Seat from "../components/seatMap/Seat"
import { MantineProvider } from "@mantine/core";

const meta = {
    component: Seat,
    title: "components/Seat",
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ]
} satisfies Meta<typeof Seat>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        seat: {
            "id": 1496,
            "seatNumber": "1A",
            "seatClass": "BUSINESS",
            "status": "AVAILABLE",
            "seatRow": 1,
            "seatColumn": 1
        },
        onSelect: () => {
            console.log("Seat Selected")
        }
    }
}