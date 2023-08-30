import { createContext, useContext } from "react";
import { useState } from "react";
import Modal from "../components/modal/Modal";

const ModalContext = createContext();

const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState();
  const [spiner, setSpiner] = useState(false);
  const [showFooter, setShowFooter] = useState(false);

  const open = (title, content, options = {}) => {
    setModalData({ title, content });
    setShowFooter(options.showFooter || false);
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        open: (title, content, options) => open(title, content, options),
        close: () => close(),
        setSpiner: setSpiner,
      }}
    >
      <Modal
        title={modalData?.title}
        open={isOpen}
        close={close}
        content={modalData?.content}
        spiner={spiner}
        showFooter={showFooter}
      />
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  return useContext(ModalContext);
};

export default ModalProvider;
