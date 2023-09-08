import React, { useState, useEffect, useReducer } from "react";
import { Layout } from "antd";
import Sidebar from "../sideBar/SideBar";
import { adminItems } from "../../sideBarItems/adminItems";
import { clientItems } from "../../sideBarItems/clienItems";
import { userData } from "../../context/UserContext";
import ReservationsForClients from "../reservationsForClients/ReservationsForClients";
import Spiner from "../spiner/Spiner";

export const Main = ({ children }) => {
  const { user } = userData();
  const [isLoading, setIsLoading] = useState(true);
  const [activeItem, setActiveItem] = useState();

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  const pickData = (item) => {
    setActiveItem(item);
  };

  return (
    <Layout
      style={{
        minHeight: "85vh",
        backgroundColor: "var(--secondary-color)",
        fontFamily: "Inconsolata",
      }}
    >
      {user?.role_id !== 1 ? (
        <Sidebar pickData={pickData} items={clientItems} />
      ) : (
        <Sidebar items={adminItems} />
      )}

      {!isLoading && user?.role_id !== 1 ? (
        <ReservationsForClients activeItem={activeItem} />
      ) : null}
      {user?.role_id === 1 && children}
      {isLoading && <Spiner />}
    </Layout>
  );
};
