import React, { useContext, useEffect, useState } from "react";
import translateDark from '../../Images/goggle-translate-icon--dark.png';
import translateLight from '../../Images/goggle-translate-icon--light.png';
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import classNames from "classnames";
import { languages } from "../Helpers/Variables";
import './TranslateTo.scss';

type Props = {
  setTranslatedLang: (value: string) => void,
}

export const TranslateTo: React.FC<Props> = ({setTranslatedLang}) => {
  const [isReloaded, setIsReloaded] = useState(false);
  const [isMove, setIsMove] = useState(false);

  const { isLight } = useContext(ThemeContext);

  useEffect(() => {
    setIsReloaded(!isReloaded);

    let cachedIsMove = isMove;

    if (isMove) {
      setIsMove(false);
    }

    setTimeout(() => {
      setIsReloaded(false);

      if (cachedIsMove) {
        setIsMove(true);
      }
    }, 600)
  }, [isLight])

  return (
    <div className='translateTo'>
      <div
        className={classNames('translateTo__img', {'translateTo__img--move': isReloaded})}
        style={{backgroundImage: `url('${isLight && !isReloaded ? translateLight : translateDark}')`}}
        onClick={() => setIsMove(!isMove)}
      />

      <div className='translateTo__wrapper'>
        <div className={classNames('translateTo__shell', {'translateTo__shell--move': isMove})}>
          <ul className='translateTo__list'>
            {languages.map((language) => (
              <li
                key={language.lang}
                className='translateTo__item'
                onClick={() => setTranslatedLang(language.lang)}
              >
                {language.lang.toUpperCase()}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
} 