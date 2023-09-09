import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;
const DateRange = ({ onChange, defaultValue }) => {
  return (
    <Space>
      <RangePicker
        format="YYYY-MM-DD"
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </Space>
  );
};

export default DateRange;
