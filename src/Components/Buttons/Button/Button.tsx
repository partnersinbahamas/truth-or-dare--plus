import React, { useContext } from "react";
import classNames from "classnames";
import './Button.scss';

import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../../Providers/Language/LangProvider";
import { getTranslation } from "../../../Transtalion";

type Props = {
  action: () => void,
  title: string,
  isDisabled?: boolean,
}

export const Button: React.FC<Props> = ({ action, title, isDisabled }) => {
  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext)

  return (
    <button 
      className={classNames(
        'button',
        'dark--button-big',
        {'light--button-big': isLight},
        {'dark--button-big_disabled': !isLight && isDisabled},
        {'light--button-big_disabled': isLight && isDisabled},
      )}
      onClick={action}
      disabled={isDisabled}
    >
      <span>{getTranslation(`button.${title}`, lang)}</span>

      {isDisabled ? (
        <i className='bx bxs-lock-alt'></i>
      ) : (
        <i className='bx bxs-lock-open-alt'></i>
      )}
    </button>
  );
};
