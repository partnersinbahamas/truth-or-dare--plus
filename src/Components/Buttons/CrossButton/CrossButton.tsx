import React, { useContext } from "react";
import classNames from "classnames";
import './CrossButton.scss';

import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";

type Props = {
  action: () => void,
}

export const CrossButton: React.FC<Props> = ({ action }) =>  {
  const { isLight } = useContext(ThemeContext);

  return (
    <button
      onClick={action}
      className={classNames(
        'dark--cross-btn',
        {'light--cross-btn': isLight}
      )}
    >
    <i className='bx bxs-x-square'></i>
  </button>
  )
}
