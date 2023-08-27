import { Table as AndTable } from "antd";
import classes from "./table.module.scss";

const Table = ({ columns, dataSource }) => {
  return (
    <div className={classes["table"]}>
      <AndTable columns={columns} dataSource={dataSource} />
    </div>
  );
};

export default Table;
