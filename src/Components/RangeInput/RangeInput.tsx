import React, { useContext } from "react";
import classNames from "classnames";
import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import './RangeInput.scss';

type Props = {
  paramInterval: string,
  setParamInterval: (value: string) => void, 
  setIsParamInterval: (value: boolean) => void,
  isParamInterval: boolean,
  onRangeChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  title: string
}

export const RangeInput: React.FC<Props>= ({
    paramInterval,
    setIsParamInterval,
    isParamInterval,
    onRangeChange,
    title,
}) => {
  const { lang } = useContext(LangContext);
  const { isLight } = useContext(ThemeContext);
  return (
    <label htmlFor="actionRange" className={classNames('range__label', 'dark--range', {'light--range': isLight})}>
      <span className="range__title">{getTranslation(`settings.title.${title}`, lang)}</span>
      <div className="range__shell">
      <button 
        className="range__button"
        onClick={() => setIsParamInterval(!isParamInterval)}
      >
        <i 
          className={`bx ${!isParamInterval 
            ? 'bx-checkbox'
            : 'bxs-checkbox-checked'}`
          }
        />
      </button>

      <input 
        type="range"
        value={paramInterval}
        min='0'
        max='10'
        onChange={(event) => onRangeChange(event)}
        disabled={!isParamInterval}
        id='actionRange'
        className={classNames("range__input", {"range__input--disabled": !isParamInterval})}
      />
      <p className="range__count">{paramInterval}</p>
      </div>
    </label>
  )
}