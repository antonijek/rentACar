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

function Test() {
  const { user } = userData();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
      element: <Clients />,
    },
    {
      path: "/vehicles",
      element: <Vehicles />,
    },
    {
      path: "/reservations",
      element: <Reservations />,
    },
    {
      path: "/reservations/add-reservation",
      element: <AddReservation />,
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

export default Test;
