import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    minHeight: "600px",
    minWidth: "600px",
    textAlign: "center",
  },
};

function ModalComponent({ openModal, closeModal, modalIsOpen, information }) {
  return (
    <div>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal" ariaHideApp={false}>
        <h2>Extra information</h2>
        <div>{information}</div>
        <button className={"button"} onClick={closeModal}>
          Close
        </button>
      </Modal>
    </div>
  );
}

export default ModalComponent;
