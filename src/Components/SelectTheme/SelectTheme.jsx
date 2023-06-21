
import classNames from "classnames";
import React, { useContext } from "react"
import { ThemeContext } from "../../Providers/Theme/ThemeProvider"
import { LangContext } from "../../Providers/Language/LangProvider";
import { getTranslation } from "../../Transtalion";

import './SelectTheme.scss';

export const SelectTheme = () => {
  const {isLight, setIsLight} = useContext(ThemeContext);
  const {lang} = useContext(LangContext);

  return (
    <div className="themes">

    <span className="language__title">
      {getTranslation('selectBar.title', lang)}
    </span>

      <div className="themes__wrapper">
        <button 
          onClick={() => setIsLight(!isLight)}
          className={classNames(
            'themes__theme',
            'dark--select',
            {'light--select-active': isLight},
            {'light--select': isLight},
          )}
        >        
          <i className={classNames('bx', isLight ? 'bxs-sun': 'bx-sun')}></i>
        </button>

        <button 
          onClick={() => setIsLight(!isLight)}
          className={classNames(
            'themes__theme',
            'dark--select',
            {'dark--select-active': !isLight},

            {'light--select': isLight}
          )}
        >
          <i className={classNames('bx', !isLight ? 'bxs-moon': 'bx-moon')}></i>
        </button>
      </div>
    </div>
  )
}
