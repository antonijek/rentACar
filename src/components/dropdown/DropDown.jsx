import React from "react";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const DropdownTabs = ({ items }) => {
  return (
    <Dropdown menu={{ items }}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          Dodaj
          <DownOutlined />
        </Space>
      </a>
    </Dropdown>
  );
};

export default DropdownTabs;
