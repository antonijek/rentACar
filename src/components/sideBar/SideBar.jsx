import React, { useState } from "react";
import classes from "./sidebar.module.scss";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { adminItems } from "../../sideBarItems/adminItems";

const { Sider } = Layout;

const Sidebar = ({ items }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();

  const activeKey = items.find((item) =>
    location.pathname.includes(item.label.toLowerCase())
  )?.key;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={classes["sidebar"]}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={[activeKey]} mode="inline">
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={`/${item.label.toLowerCase()}`}>{t(item.label)}</Link>
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
