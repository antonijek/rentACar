import React from "react";
import { Modal as AntdModal, Button } from "antd";
import Spiner from "../spiner/Spiner";
import classes from "./modal.module.scss";
import { useTranslation } from "react-i18next";

const Modal = ({
  open,
  title = "",
  content = <></>,
  close,
  spiner,
  showFooter,
  onOk,
}) => {
  const { t } = useTranslation();
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
            <Button onClick={close}>{t("cancel")}</Button>
            <Button type="primary" onClick={onOk}>
              {t("ok")}
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
