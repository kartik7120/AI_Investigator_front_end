import type { Meta, StoryObj } from "@storybook/react-vite";
import AddonCard from "../components/Add-ons/AddOneCard";
import { MantineProvider } from "@mantine/core";

const meta = {
    title: "Components/Add-ons/AddOneCard",
    component: AddonCard,
    decorators: [
        (Story) => (
            <div>
                <MantineProvider>
                    <Story />
                </MantineProvider>
            </div>
        )
    ]
} satisfies Meta<typeof AddonCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        addon: {
            fareType: "ECONOMY",
            flightID: 123,
            id: 1,
            price: 1000,
            quantity: 1,
            type: "Extra Baggage"
        },
        onAdd: (addon) => {
            console.log("Addon added:", addon);
        }
    }
};