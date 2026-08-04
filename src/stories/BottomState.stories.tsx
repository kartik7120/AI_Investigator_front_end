import type { Meta, StoryObj } from "@storybook/react-vite";
import StatsSection from "../components/bottomStates";
import { MantineProvider } from "@mantine/core";

const meta = {
    component: StatsSection,
    title: "Components/BottomStates",
    // parameters: {
    //     layout: "fullscreen",
    // },
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )]
} satisfies Meta<typeof StatsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {},
};