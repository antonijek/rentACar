import React, { Children } from "react";
import { Layout, Menu } from "antd";
import Sidebar from "../sideBar/SideBar";

export const Main = ({ children }) => {
  return (
    <Layout
      style={{
        minHeight: "85vh",
        backgroundColor: "var(--secondary-color)",
      }}
    >
      <Sidebar />
      {children}
    </Layout>
  );
};
