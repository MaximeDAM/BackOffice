import React from "react";

const Modal = () => {

  const modalContainer = document.querySelector(".modal-container");
  const modalTriggers = document.querySelectorAll(".modal-trigger");

  const toggleModal = () => {
    
    modalContainer.classList.toggle("active");
  };
  
  modalTriggers.forEach((trigger) =>
    trigger.addEventListener("click", toggleModal)
  );
  return (
    <div className="modal-container">
      <div className="overlay modal-trigger"></div>
      <div
        className="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="dialogDesc"
      >
        <button aria-label="close modal" className="close-modal modal-trigger">
          X
        </button>
        <h1 id="modalTitle">Voici du Contenu</h1>
        <p id="dialogDesc">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quam
          dolorem, aspernatur excepturi asperiores ab ducimus.
        </p>
      </div>
      <button className="modal-btn modal-trigger">Open</button>
    </div>
  );
};

export default Modal;
