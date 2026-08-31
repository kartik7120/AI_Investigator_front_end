import type { Meta, StoryObj } from "@storybook/react-vite";
import SRPPage from "../components/SRP/SRPPage";
import { MantineProvider } from "@mantine/core";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { BrowserRouter } from "react-router";

const queryClient = new QueryClient();

const meta = {
  component: SRPPage,
  title: "Components/SRPPage",

  decorators: [
    (Story) => (
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <MantineProvider>
            <Story />
          </MantineProvider>
        </QueryClientProvider>
      </BrowserRouter>
    ),
  ],
} satisfies Meta<typeof SRPPage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};