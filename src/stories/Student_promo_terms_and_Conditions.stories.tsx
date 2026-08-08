import type { Meta, StoryObj } from "@storybook/react-vite";
import StudentPromoTerms from "../components/Student_promo_code_terms";
import { MantineProvider } from "@mantine/core";

const meta = {
    component: StudentPromoTerms,
    title: "components/studentPromoTerms",
    decorators: [
        (Story) => (
            <MantineProvider>
                <Story />
            </MantineProvider>
        )
    ]
} satisfies Meta<typeof StudentPromoTerms>

type Story = StoryObj<typeof meta>;

export default meta;

export const Default: Story = {

}