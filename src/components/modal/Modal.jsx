import React, { useState } from "react";
import { Modal as AntdModal } from "antd";
import Spiner from "../spiner/Spiner";
import classes from "./modal.module.scss";

const Modal = ({ open, title = "", content = <></>, close, spiner }) => {
  return (
    <AntdModal
      title={title}
      className={classes["__modal-container"]}
      open={open}
      onOk={close}
      onCancel={close}
    >
      {content}
      {spiner && <Spiner />}
    </AntdModal>
  );
};

export default Modal;
