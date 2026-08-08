import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/core/styles.css';
// ‼️ import carousel styles after core package styles
import '@mantine/carousel/styles.css';
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import CheckInIndex from './components/check-in/check_in_index.tsx';
import ManageIndex from './components/manage/manage_index.tsx';
import SkyEarlyPromoTerms from './components/Singapore_promo_terms_conditions.tsx';
import StudentPromoTerms from './components/Student_promo_code_terms.tsx';

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
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
]);

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <Notifications>
          <RouterProvider router={router} />
        </Notifications>
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode>,
)
