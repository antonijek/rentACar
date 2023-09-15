import Home from "../pages/home/Home";
import ModalProvider from "../context/ModalContext";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Clients from "../pages/clients/Clients";
import Login from "../pages/login/Login";
import Vehicles from "../pages/vehicles/Vehicles";
import Reservations from "../pages/reservations/Reservations";
import UserProvider, { userData } from "../context/UserContext";
import AddReservation from "../pages/addReservation/AddReservation";
import ReservationsForClients from "./reservationsForClients/ReservationsForClients";
//import Test from "./components/Test";
import ClientProvider from "../context/ClientContext";
import VehicleProvider from "../context/VehicleContext";
import MobileNavbar from "./navbar/MobileNavbar";
import ReservationProvider from "../context/ReservationContext";
import AuthGuard from "./AuthGuard";
import { Page404 } from "./page404/Page404";
import { RestrictedArea } from "./restrictedArea/RestrictedArea";

function MainApp() {
  const { user } = userData();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/restricted-area",
      element: <RestrictedArea />,
    },
    {
      path: "/mobile",
      element: <MobileNavbar />,
    },

    {
      path: "/my-reservations",
      element: <ReservationsForClients />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/clients",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Clients />
        </AuthGuard>
      ),
    },
    {
      path: "/vehicles",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Vehicles />
        </AuthGuard>
      ),
    },
    {
      path: "/reservations",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <Reservations />
        </AuthGuard>
      ),
    },
    {
      path: "/reservations/add-reservation",
      element: (
        <AuthGuard allowedRoles={[1]}>
          <AddReservation />
        </AuthGuard>
      ),
    },
    {
      path: "*",
      element: <Page404 />,
    },
  ]);

  return (
    <div>
      {user?.role_id === 1 ? (
        <ReservationProvider>
          <ClientProvider>
            <VehicleProvider>
              <RouterProvider router={router} />
            </VehicleProvider>
          </ClientProvider>
        </ReservationProvider>
      ) : (
        <RouterProvider router={router} />
      )}
    </div>
  );
}

export default MainApp;
