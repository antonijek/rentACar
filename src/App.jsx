import "./App.css";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <Navbar />
      <Home />
    </I18nextProvider>
  );
}

export default App;
