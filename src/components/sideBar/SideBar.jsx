import React, { useState } from "react";
import classes from "./sidebar.module.scss";
import { Layout, Menu } from "antd";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";
import { userData } from "../../context/UserContext";

const { Sider } = Layout;

const Sidebar = ({ items, pickData }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { t } = useTranslation();
  const location = useLocation();
  const { user } = userData();

  const activeKey = items.find((item) =>
    location.pathname.includes(item.label.toLowerCase())
  )?.key;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      className={classes["sidebar"]}
      items={items}
    >
      <div className="demo-logo-vertical" />
      <Menu theme="dark" defaultSelectedKeys={[activeKey]} mode="inline">
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {user?.role_id === 1 ? (
              <Link to={`/${item.label.toLowerCase()}`}>{t(item.label)}</Link>
            ) : (
              <span
                onClick={() => {
                  pickData(item);
                }}
              >
                {t(item.label)}
              </span>
            )}
          </Menu.Item>
        ))}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
