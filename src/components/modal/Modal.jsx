import React from "react";
import { Modal as AntdModal, Button } from "antd";
import Spiner from "../spiner/Spiner";
import classes from "./modal.module.scss";

const Modal = ({
  open,
  title = "",
  content = <></>,
  close,
  spiner,
  showFooter,
  onOk,
}) => {
  return (
    <AntdModal
      title={title}
      className={classes["__modal-container"]}
      visible={open}
      onOk={onOk}
      onCancel={close}
      footer={
        showFooter && (
          <div>
            <Button onClick={close}>Cancel</Button>
            <Button type="primary" onClick={onOk}>
              OK
            </Button>
          </div>
        )
      }
    >
      {content}
      {spiner && <Spiner />}
    </AntdModal>
  );
};

export default Modal;
