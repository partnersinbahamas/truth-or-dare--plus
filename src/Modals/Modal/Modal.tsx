import React, { useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import CrossButton from "../../Components/Buttons/CrossButton/CrossButtonInput";
import './Modal.scss';

type Props = {
  children: any,
  setModal: (value: boolean) => void,
}

const modalRoot = document.getElementById('modal');

export const Modal: React.FC<Props> = ({children, setModal}) => {
  const modalElement = useMemo(() => document.createElement('div'), []);

  useEffect(() => {
    modalRoot?.appendChild(modalElement);

    return () => {
      modalRoot?.removeChild(modalElement);
    }
  })

  return createPortal(
    <div className="modal">
      <CrossButton action={() => setModal(false)}/>
      {children}
    </div>,
    modalElement
  );
}