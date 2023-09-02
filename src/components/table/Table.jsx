import { Table as AndTable } from "antd";
import classes from "./table.module.scss";

const Table = ({ columns, dataSource, bordered, rowSelection, onRow }) => {
  return (
    <div className={classes["table"]}>
      <AndTable
        columns={columns}
        dataSource={dataSource}
        bordered={bordered}
        rowSelection={rowSelection}
        onRow={onRow}
      />
    </div>
  );
};

export default Table;
