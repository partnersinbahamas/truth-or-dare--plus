import React, { useContext } from "react";
import classNames from "classnames";
import './GameStart.scss';

import { LangContext } from "../../../Providers/Language/LangProvider";
import { getTranslation } from "../../../Transtalion";
import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";

type Props = {
  title: string,
}

export const GameStart: React.FC<Props> = ({ title }) => {
  const { lang } = useContext(LangContext);
  const { isLight } = useContext(ThemeContext);

  return (
    <div
      className={classNames(
        'gameStart',
        'dark--game-start',
        {'light--game-start': isLight}
      )}
    >
      <p className="gameStart__message">
        {getTranslation(`game.${title}`, lang)}
      </p>

      <div className="gameStart__wrapper">
        <i className='bx bxs-down-arrow gameStart__arrow'>
          {title === 'truth|dare' && (
            <span className='gameStart__arrow-mark'>?</span>
          )}
        </i>
      </div>
    </div>
  )
}
