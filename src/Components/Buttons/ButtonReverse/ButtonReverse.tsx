import React, { useContext } from "react";
import classNames from "classnames";
import './ButtonReverse.scss';

import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../../Providers/Language/LangProvider";
import { getTranslation } from "../../../Transtalion";


type Props = {
  action: () => void,
  title: string,
  isDisabled?: boolean
}

export const ButtonReverse: React.FC<Props> = ({ action, title, isDisabled }) => {
  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext)

  return (
    <button 
      className={classNames(
        'button-reverse',
        'dark--button-big',
        'dark--button-big-reverse',
        {'light--button-big': isLight},
        {'light--button-big-reverse': isLight},
        {'dark--button-big-reverse_disabled': !isLight && isDisabled},
        {'light--button-big-reverse_disabled': isLight && isDisabled},
      )}
      onClick={action}
      disabled={isDisabled}
    >
      <span>{getTranslation(`button.${title}`, lang)}</span>

      {isDisabled ? (
        <i className='bx bx-lock-alt'></i>
      ) : (
        <i className='bx bx-lock-open-alt'></i>
      )}
    </button>
  )
}