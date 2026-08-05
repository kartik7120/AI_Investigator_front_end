import type { Meta, StoryObj } from "@storybook/react-vite";
import { HeroImageRight } from "../components/heroBanner";
import { MantineProvider } from "@mantine/core";

const meta = {
    component: HeroImageRight,
    title: "Components/HeroImageRight",
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        ),
    ],
} satisfies Meta<typeof HeroImageRight>;

export default meta;

type Story = StoryObj<typeof HeroImageRight>;

export const Default = {
    args: {},
};