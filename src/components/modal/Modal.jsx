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
  className,
}) => {
  const { t } = useTranslation();
  return (
    <AntdModal
      title={<span className={className}>{title}</span>}
      className={classes["__modal-container"]}
      open={open}
      onOk={onOk}
      onCancel={close}
      footer={
        showFooter && (
          <div>
            <Button onClick={close}>{t("cancel")}</Button>
            <Button type="primary" danger onClick={onOk}>
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
