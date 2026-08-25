import type { Meta, StoryObj } from "@storybook/react-vite";
import SRPPage from "../components/SRP/SRPPage";
import { MantineProvider } from "@mantine/core";

const meta = {
  component: SRPPage,
  title: "Components/SRPPage",
  decorators: [
    (Story) => (
      <div>
        <MantineProvider>
          <Story />
        </MantineProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof SRPPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
