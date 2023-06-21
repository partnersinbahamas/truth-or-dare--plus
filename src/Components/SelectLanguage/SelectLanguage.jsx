import React, {useContext, useEffect, useState} from "react";
import { LangContext } from "../../Providers/Language/LangProvider";
import { languages } from "../Helpers/Variables";
import { getTranslation } from "../../Transtalion";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

import './SelectLanguage.scss';
import classNames from "classnames";

export const SelectLanguage = () => {
  const {lang, setLang} = useContext(LangContext);
  const [isSelect, setIsSelect] = useState(false);
  const {isLight} = useContext(ThemeContext)

  let visibleLang;

  switch (lang) {
    case 'en':
      visibleLang = 'English'
    break;

    case 'ru':
      visibleLang = 'Русский'
    break;

    case 'de':
      visibleLang = 'Deutsch'
    break;
    
    default:
      break;
  }

  const onLangChange = (value) => {
    setLang(value);
    setIsSelect(false);
  }

  return (
    <div 
      className={classNames(
        'language',
        'dark',
        {'light' : isLight}
      )}
    >
      <span
        className="language__title"
      >
        {getTranslation('selectBar.title', lang)}
      </span>

      <div 
        className={classNames(
          'language__wrapper',
          'dark--select',
          {'light--select': isLight}
        )}
      >
        <button 
          onClick={() => setIsSelect(!isSelect)}
          className='language__main'
        >
        {visibleLang}
        <div 
          className={classNames(
            'language__main--arrow',
            {'language__main--arrow-move': isSelect}
          )}
        >
          ➤
        </div>
      </button>

      {isSelect && (
        <>
          {languages.map((language) => {
            const { id, langName } = language;

            return (
              <div 
                key={id}
                onClick={() => onLangChange(language.lang)}
                className='language__main'
              >
                {langName}

                {language.lang === lang && (
                <span style={{color: !isLight ? 'rgb(50, 252, 78)' : '#4276FB', transition: '1s'}}>✓</span>
                )}
              </div>
            )
          })}
        </>
      )}
      </div>
    </div>
  )
}
