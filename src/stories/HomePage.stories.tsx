import type { Meta, StoryObj } from "@storybook/react-vite";
import { MantineProvider } from "@mantine/core";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import {
    createMemoryRouter,
    RouterProvider,
} from "react-router";

import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/carousel/styles.css";

import HomePage from "../components/HomePage";
import ManageIndex from "../components/manage/manage_index";
import CheckInIndex from "../components/check-in/check_in_index";
import SkyEarlyPromoTerms from "../components/Singapore_promo_terms_conditions";
import StudentPromoTerms from "../components/Student_promo_code_terms";

const queryClient = new QueryClient();

const router = createMemoryRouter(
    [
        {
            path: "/",
            element: <HomePage />,
        },
        {
            path: "/check-in",
            element: <CheckInIndex />,
        },
        {
            path: "/manage",
            element: <ManageIndex />,
        },
        {
            path: "/singapore_promo",
            element: <SkyEarlyPromoTerms />
        },
        {
            path: "/student_promo",
            element: <StudentPromoTerms />
        }

    ],
    {
        initialEntries: ["/"],
    }
);

const meta = {
    component: HomePage,
    title: "Component/HomePage",

    parameters: {
        layout: "fullscreen",
    },

    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                <MantineProvider>
                    <RouterProvider router={router} />
                </MantineProvider>
            </QueryClientProvider>
        ),
    ],
} satisfies Meta<typeof HomePage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};