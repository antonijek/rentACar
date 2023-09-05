import React from "react";
import { DatePicker, Space } from "antd";

const { RangePicker } = DatePicker;
const DateRange = ({ onChange }) => {
  return (
    <Space>
      <RangePicker
        showTime={{
          format: "HH:mm",
        }}
        format="YYYY-MM-DD"
        onChange={onChange}
      />
    </Space>
  );
};

export default DateRange;
