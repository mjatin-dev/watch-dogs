import React from "react";
interface InterfaceModal {
  handleClose: () => void;
  show: boolean;
  children: React.ReactNode;
}
const Modal = ({ handleClose, show, children }: InterfaceModal) => {
  const showHideClassName = show ? "block" : "hidden";

  return (
    <div
      className={`fixed z-20 inset-0 overflow-y-auto ${showHideClassName}`}
      aria-labelledby='modal-title'
      role='dialog'
      aria-modal='true'
    >
      <div className='flex items-center justify-center min-h-screen p-4'>
        <div
          className='fixed inset-0 bg-black opacity-75 ease-out duration-300 transition-opacity'
          onClick={handleClose}
        ></div>
        <div className='relative bg-white rounded-3xl  w-full max-w-md mx-auto z-10'>
          {children}
        </div>
        k
      </div>
    </div>
  );
};

export default Modal;
