import React from "react";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";
import { useTranslation } from "react-i18next";
import classes from "./dropdown.module.scss";

const DropdownTabs = ({ items }) => {
  const { t } = useTranslation();

  return (
    <Dropdown menu={{ items }} className={classes["custom-dropdown-menu"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <span className={classes["dropdownTitle"]}>{t("dropdownTitle")}</span>
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownTabs;
