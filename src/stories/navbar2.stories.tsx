import type { Meta, StoryObj } from "@storybook/react-vite";
import navbarSecond from "../components/navbarSecond";

const meta = {
    title: "components/NavbarSecond",
    component: navbarSecond,
} satisfies Meta<typeof navbarSecond>

export default meta;

type Story = StoryObj<typeof meta>

export const Default: Story = {

}