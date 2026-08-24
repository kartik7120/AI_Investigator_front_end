import type { Meta, StoryObj } from "@storybook/react-vite";
import SRPPageBookingWidgetModal from "../components/SRP/SRPPageBookingWidgetModal";
import { MantineProvider } from "@mantine/core";

const meta = {
  title: "Components/SRPBookingWidget",
  component: SRPPageBookingWidgetModal,
  decorators: [
    (Story) => (
      <div>
        <MantineProvider>
          <Story />
        </MantineProvider>
      </div>
    ),
  ],
} satisfies Meta<typeof SRPPageBookingWidgetModal>;

export default meta;

type Story = StoryObj<typeof SRPPageBookingWidgetModal>;

export const Default: Story = {};
