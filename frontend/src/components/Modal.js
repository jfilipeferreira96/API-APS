
import React from 'react'
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minHeight: '600px',
    minWidth: '600px',
    textAlign:'center'
  },
};

function ModalComponent({openModal, closeModal, modalIsOpen }) {

  return (
    <div>
        <button className={"tipButton"} onClick={openModal}>Tip Info</button>
          
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
        >
            <h2>Hello</h2>
            <div>I am a modal</div>
            <button className={'button'} onClick={closeModal}>Close</button>
        </Modal>
    </div>
  );

}

export default ModalComponent