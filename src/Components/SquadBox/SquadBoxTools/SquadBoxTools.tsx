import React, { useContext, useState } from "react";
import classNames from "classnames";
import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";

type Props = {
  setIcons: (value: boolean) => void,
  icons: boolean,
  setEdit: (value: boolean) => void,
  edit: boolean,
  setModal: (value: boolean) => void,
  modal: boolean,
}

export const SquadBoxTools: React.FC<Props> = ({setIcons, icons, setEdit, edit, setModal, modal}) => {
  const { isLight } = useContext(ThemeContext);

  function editChanged() {
    setEdit(!edit);
  }

  function setIsModal() {
    setModal(true);
  }

  return (
    <div
      className={classNames(
        'squadBox__tools',
        'dark__squadBox--tools',
        {'light__squadBox--tools': isLight}
      )}
    >
      <div style={{display: 'flex'}}>
        <i className='bx bx-image-alt'onClick={() => setIcons(!icons)}></i>
        <i className='bx bxs-edit' onClick={editChanged}></i>
        <i className='bx bx-user-plus' onClick={setIsModal}></i>
      </div>
    </div>
  )
}