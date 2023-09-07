import React, { Children, useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import Sidebar from "../sideBar/SideBar";
import { adminItems } from "../../sideBarItems/adminItems";
import { clientItems } from "../../sideBarItems/clienItems";
import { userData } from "../../context/UserContext";
import ReservationsForClients from "../reservationsForClients/ReservationsForClients";
import Spiner from "../spiner/Spiner";

export const Main = ({ children }) => {
  const { user } = userData();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user data (replace with actual logic)
    setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the timeout duration as needed
  }, []);

  return (
    <Layout
      style={{
        minHeight: "85vh",
        backgroundColor: "var(--secondary-color)",
        fontFamily: "Inconsolata",
      }}
    >
      {user?.role_id !== 1 ? (
        <Sidebar items={clientItems} />
      ) : (
        <Sidebar items={adminItems} />
      )}

      {
        !isLoading && user?.role_id !== 1 ? (
          <ReservationsForClients />
        ) : null /* or any other loading indicator */
      }
      {user?.role_id === 1 && children}
      {isLoading && <Spiner />}
    </Layout>
  );
};
