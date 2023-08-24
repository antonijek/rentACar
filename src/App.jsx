import "./App.css";
import Home from "./pages/home/Home";
import ModalProvider from "./context/ModalContext";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Clients from "./pages/clients/Clients";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/clients",
      element: <Clients />,
    },
  ]);

  return (
    <I18nextProvider i18n={i18n}>
      <ModalProvider>
        <RouterProvider router={router} />
      </ModalProvider>
    </I18nextProvider>
  );
}

export default App;
