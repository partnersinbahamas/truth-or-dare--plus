import React, { useContext } from "react";
import classNames from "classnames";

import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";

type Props = {
  action: () => void,
}

export const CrossButton: React.FC<Props> = ({ action }) =>  {
  const {isLight} = useContext(ThemeContext);

  return (
    <button
      style={{
        borderRadius: '50%',
        padding: '10px',
        lineHeight: '10px'
      }}
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
