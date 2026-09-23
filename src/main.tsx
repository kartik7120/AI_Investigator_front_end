import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
// ‼️ import notifications styles after core package styles
import '@mantine/notifications/styles.css';
// ‼️ import carousel styles after core package styles
import { createBrowserRouter, RouterProvider } from "react-router";
import CheckInIndex from './components/check-in/check_in_index.tsx';
import ManageIndex from './components/manage/manage_index.tsx';
import SkyEarlyPromoTerms from './components/Singapore_promo_terms_conditions.tsx';
import StudentPromoTerms from './components/Student_promo_code_terms.tsx';
import SRPPage from './components/SRP/SRPPage.tsx';
import HomePage from './components/HomePage.tsx';
import PaxEditPage from './components/paxEditPage/PaxEditPage.tsx';
import AddOnsPage from './components/Add-ons/AddOnsPage.tsx';
import SeatMapPage from './components/seatMap/seatMapPage.tsx';

export const router = createBrowserRouter([
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
  },
  {
    path: "/SRPPage",
    element: <SRPPage />
  },
  {
    path: "/passengerEditPage",
    element: <PaxEditPage />
  },
  {
    path: "/add-ons",
    element: <AddOnsPage />
  },
  {
    path: "/seatMap",
    element: <SeatMapPage />
  },
  {
    path: "/payment",
    element: <div>
      Payment page
    </div>
  }
]);

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        {/* <Notifications> */}
        <RouterProvider router={router} />
        {/* </Notifications> */}
      </MantineProvider>
    </QueryClientProvider>
  </StrictMode >,
)

