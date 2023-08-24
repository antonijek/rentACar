import React, { useState } from "react";
import classes from "./sidebar.module.scss";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { TeamOutlined, CarOutlined, ScheduleOutlined } from "@ant-design/icons";

const { Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem("Clients", "sub1", <TeamOutlined />),
  getItem("Vehicles", "2", <CarOutlined />),
  getItem("Reservations", "1", <ScheduleOutlined />),
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={classes["sidebar"]}
    >
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;
