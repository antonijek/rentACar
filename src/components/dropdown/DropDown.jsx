import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import classes from "./dropdown.module.scss";
import { userData } from "../../context/UserContext";

const DropdownTabs = ({ items }) => {
  const { t } = useTranslation();
  const { user } = userData();

  return (
    <Dropdown menu={{ items }} className={classes["custom-dropdown-menu"]}>
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
