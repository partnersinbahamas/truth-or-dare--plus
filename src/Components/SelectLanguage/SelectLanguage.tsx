import React, {useContext, useState} from "react";
import { LangContext } from "../../Providers/Language/LangProvider";
import { languages } from "../Helpers/Variables";
import { getTranslation } from "../../Transtalion";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { useSessionStorage } from "usehooks-ts";

import classNames from "classnames";
import './SelectLanguage.scss';

export const SelectLanguage = () => {
  const {lang, setLang} = useContext(LangContext);
  const { isLight } = useContext(ThemeContext);

  const [isSelect, setIsSelect] = useState<boolean>(false);

  const [questionIndex, setQuestionIndex] = useSessionStorage<number>('questionIndex', 0); 
  const [dareIndex, setDareIndex] = useSessionStorage<number>('dareIndex', 0);

  let visibleLang = 'English';

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
    
    case 'ua':
      visibleLang = 'Українська'
    default:
      break;
  }

  const restLanguages = languages.filter((language) => language.langName !== visibleLang);

  const onLangChange = (value: string): void => {
    setLang(value);
    setIsSelect(false);

    setQuestionIndex(0);
    setDareIndex(0);
  }

  return (
    <div 
      className={classNames(
        'language',
        'dark',
        {'light' : isLight}
      )}
    >
      <span className="language__title">
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
          className='language__item'
        >
          {visibleLang}
          <div 
            className={classNames(
              'language__item--arrow',
              {'language__item--arrow-move': isSelect}
            )}
          >
            ➤
          </div>
        </button>

        {isSelect && (
          <ul className="language__list">
            {restLanguages.map((language) => {
              const { id, langName } = language;

              return (
                <li 
                  key={id}
                  onClick={() => onLangChange(language.lang)}
                  className={classNames(
                    'language__item',
                    'dark--select-item',
                    { 'light--select-item': isLight },
                  )}
                >
                  {langName}

                  {language.lang === lang && (
                  <span 
                    style={{
                      color: !isLight ? 'rgb(50, 252, 78)' : '#4276FB', transition: '1s'
                    }}
                  >
                    ✓
                  </span>
                  )}
                </li>
              )
            })}
          </ul>
        )}
      </div>
    </div>
  )
}
