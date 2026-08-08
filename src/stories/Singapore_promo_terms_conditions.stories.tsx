import type { Meta, StoryObj } from "@storybook/react-vite";
import { MantineProvider } from "@mantine/core";
import SkyEarlyPromoTerms from "../components/Singapore_promo_terms_conditions";

const meta = {
    component: SkyEarlyPromoTerms,
    title: "components/Singapore_Promo_Code",
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ]
} satisfies Meta<typeof SkyEarlyPromoTerms>

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {

}