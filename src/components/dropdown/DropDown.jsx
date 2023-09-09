import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Menu } from "antd";
import { useTranslation } from "react-i18next";
import classes from "./dropdown.module.scss";
import { userData } from "../../context/UserContext";

const DropdownTabs = ({ items, onItemClick }) => {
  const { t } = useTranslation();
  const { user } = userData();

  return (
    <Dropdown
      overlay={
        <Menu>
          {items.map((item) => (
            <Menu.Item key={item.key} onClick={() => onItemClick(item)}>
              {item.label}
            </Menu.Item>
          ))}
        </Menu>
      }
      className={classes["custom-dropdown-menu"]}
    >
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <span className={classes["dropdownTitle"]}>{user?.first_name}</span>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownTabs;
