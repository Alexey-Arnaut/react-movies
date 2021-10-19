import React from "react";

import "./modal.scss";

const Modal = (props) => {
  return (
    <div className={`modal ${props.active ? "modal--active" : ""}`}>
      <div className="modal-inner">
        <div className="modal-content">
          <button className="modal__close" onClick={props.closeModal}></button>
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
