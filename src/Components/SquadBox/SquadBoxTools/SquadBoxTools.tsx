import React, { useContext } from "react";
import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";
import classNames from "classnames";

type Props = {
  setIcons: (value: boolean) => void,
  icons: boolean,
  setEdit: (value: boolean) => void,
  edit: boolean,
  setModal: (value: boolean) => void,
}

export const SquadBoxTools: React.FC<Props> = ({
  setIcons,
  icons,
  setEdit,
  edit,
  setModal
}) => {
  const { isLight } = useContext(ThemeContext);

  function editChanged(): void {
    setEdit(!edit);
  }

  function setIsModal(): void {
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
      <div className="squadBox__tools-wrapper">
        <i className='bx bx-image-alt' onClick={() => setIcons(!icons)}/>
        <i className='bx bxs-edit' onClick={editChanged}/>
        <i className='bx bx-user-plus' onClick={setIsModal}/>
      </div>
    </div>
  )
}
