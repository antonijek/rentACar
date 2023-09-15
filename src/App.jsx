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
//import Test from "./components/Test";
import ClientProvider from "./context/ClientContext";
import VehicleProvider from "./context/VehicleContext";
import MobileNavbar from "./components/navbar/MobileNavbar";
import ReservationProvider from "./context/ReservationContext";
import AuthHoc from "./pages/authHOC/AuthHoc";
import MainApp from "./components/MainApp";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <UserProvider>
        <ModalProvider>
          <MainApp />
        </ModalProvider>
      </UserProvider>
    </I18nextProvider>
  );
}

export default App;
