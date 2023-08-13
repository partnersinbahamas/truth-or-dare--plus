import React, { useContext } from "react"
import classNames from "classnames";
import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../../Providers/Language/LangProvider";
import { getTranslation } from "../../../Transtalion";
import './ButtonSmall.scss';

type Props = {
  action: () => void,
  title: string,
  isDisabled?: boolean,
}

export const ButtonSmall: React.FC<Props> = ({ action, title, isDisabled = false }) => {
  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext)

  return (
    <button 
      className={classNames(
        'button',
        'button--small',
        'dark--button-small',
        {'light--button-small': isLight},
      )}
      onClick={action}
      disabled={isDisabled}
    >
      <span>{getTranslation(`button.${title}`, lang)}</span>
    </button>
  )
}