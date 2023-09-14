import { Table as AntTable } from "antd";
import classes from "./table.module.scss";

const Table = ({ columns, dataSource, bordered, rowSelection, onRow }) => {
  return (
    <div className={classes["table"]}>
      <AntTable
        columns={columns}
        dataSource={dataSource}
        bordered={bordered}
        rowSelection={rowSelection}
        onRow={onRow}
        className={classes["custom-table"]}
      />
    </div>
  );
};

export default Table;
