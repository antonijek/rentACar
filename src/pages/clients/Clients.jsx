import React from "react";
import wrapperHoc from "../wraper/wraperHoc";
import { useModal } from "../../context/ModalContext";

const Clients = () => {
  const modal = useModal();
  console.log(modal);
  return (
    <div>
      Clients
      <button
        onClick={() =>
          modal.open("moj modal", <div>Ovo ce da bude neka komponenta</div>)
        }
      >
        OK
      </button>
    </div>
  );
};

export default wrapperHoc(Clients);
