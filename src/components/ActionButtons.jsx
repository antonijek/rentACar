import React, { useState } from "react";
import Button from "../components/buttons/button/Button";
import classes from "../components/table/table.module.scss";
import Message from "./message/Message";
import ClientForm from "./form/ClientForm"; // Assuming this is the correct import
import { useModal } from "../context/ModalContext";
import Modal from "./modal/Modal";
import { deleteUser } from "../services/userServices";
import { getAllUsers } from "../services/userServices";

const ActionButtons = ({ t, data, setClients }) => {
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const modal = useModal();

  const handleDeleteClick = () => {
    setDeleteModalVisible(true);
  };

  const handleConfirmDelete = async (id) => {
    setIsOpen(true);
    try {
      const res = await deleteUser(id);
      console.log(res);
      Message({ type: "success", content: t("successDelete") });
      const users = await getAllUsers();
      setClients(users);
      setDeleteModalVisible(false);
      setIsOpen(false);
    } catch (err) {
      console.log(err);
      setDeleteModalVisible(false);
      setIsOpen(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
  };

  return (
    <div className={classes["action-buttons"]}>
      <Button
        className={classes["blue-button"]}
        onClick={() => {
          modal.open(
            t("edit"),
            <ClientForm data={data} setClients={setClients} />,
            { showFooter: false }
          );
        }}
        text={t("edit")}
      />
      <Button
        className={classes["red-button"]}
        text={t("delete")}
        onClick={handleDeleteClick}
      />

      <Modal
        open={deleteModalVisible}
        title={t("delete")}
        onOk={() => handleConfirmDelete(data.id)}
        close={handleCancelDelete}
        content={t("doYouWantDelete")}
        spiner={isOpen}
        //showFooter={true}
      />
    </div>
  );
};

export default ActionButtons;
