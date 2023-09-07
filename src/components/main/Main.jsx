import React, { Children } from "react";
import { Layout, Menu } from "antd";
import Sidebar from "../sideBar/SideBar";
import { adminItems } from "../../sideBarItems/adminItems";
import { clientItems } from "../../sideBarItems/clienItems";
import { userData } from "../../context/UserContext";
import ReservationsForClients from "../reservationsForClients/ReservationsForClients";

export const Main = ({ children }) => {
  const { user } = userData();

  return (
    <Layout
      style={{
        minHeight: "85vh",
        backgroundColor: "var(--secondary-color)",
        fontFamily: "Inconsolata",
      }}
    >
      {user?.role_id === 1 ? (
        <Sidebar items={adminItems} />
      ) : (
        <Sidebar items={clientItems} />
      )}

      {user?.role_id === 1 ? children : <ReservationsForClients />}
    </Layout>
  );
};
