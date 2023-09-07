import "./App.css";
import Home from "./pages/home/Home";
import ModalProvider from "./context/ModalContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Clients from "./pages/clients/Clients";
import Login from "./pages/login/Login";
import Vehicles from "./pages/vehicles/Vehicles";
import Reservations from "./pages/reservations/Reservations";
import UserProvider from "./context/UserContext";
import AddReservation from "./pages/addReservation/AddReservation";
import ReservationsForClients from "./components/reservationsForClients/ReservationsForClients";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
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
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>
      </UserProvider>
    </I18nextProvider>
  );
}

export default App;
