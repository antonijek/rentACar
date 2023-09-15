import React, { useState, useEffect } from "react";
import { Layout } from "antd";
import Sidebar from "../sideBar/SideBar";
import { adminItems } from "../../sideBarItems/adminItems";
import { clientItems } from "../../sideBarItems/clienItems";
import { userData } from "../../context/UserContext";
import ReservationsForClients from "../reservationsForClients/ReservationsForClients";
import Spiner from "../spiner/Spiner";
import { useNavigate } from "react-router-dom";

export const Main = ({ children }) => {
  const { user } = userData();
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const sidebarItems = user?.role_id !== 1 ? clientItems : adminItems;

  return (
    <Layout
      style={{
        minHeight: "85vh",
        backgroundColor: "var(--secondary-color)",
        fontFamily: "Inconsolata",
      }}
    >
      <Sidebar pickData={setActiveItem} items={sidebarItems} />
      {!isLoading && user?.role_id !== 1 ? (
        <ReservationsForClients activeItem={activeItem} />
      ) : null}
      {user?.role_id === 1 && children}
      {isLoading && <Spiner />}
    </Layout>
  );
};
