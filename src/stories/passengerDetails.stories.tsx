import type { Meta, StoryObj } from "@storybook/react-vite";
import PaxDetailsForm from "../components/paxEditPage/PaxDetailsForm";
import { MantineProvider } from "@mantine/core";

const meta = {
    component: PaxDetailsForm,
    title: "Components/PaxDetailsForm",
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ]
} satisfies Meta<typeof PaxDetailsForm>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {
    args: {
        passengerCount: 6
    }
}