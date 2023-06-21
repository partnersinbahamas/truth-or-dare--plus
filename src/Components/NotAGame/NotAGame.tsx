import React, { useContext } from "react";
import classNames from "classnames";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";
import './NotAGame.scss';
import { getTranslation } from "../../Transtalion";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";

export const NotAGame = () => {
    const [players, setPlayers] = useLocaleStorage('players', []);
    const [mode, setMode] = useLocaleStorage('mode', []);

    const { isLight } = useContext(ThemeContext);
    const { lang } = useContext(LangContext);

  return (
    <section className="not-a-game">
        <div className="not-a-game__top">
          <i 
            className={classNames(
              'bx bx-joystick',
              'not-a-game__icon',
              'dark--game-icon',
              {'light--game-icon': isLight}
            )}
          />

          <i 
            className={classNames(
              'bx bxs-joystick',
              'not-a-game__icon',
              'not-a-game__icon-move',
              'dark--game-icon',
              {'light--game-icon': isLight}
            )}
          />
        </div>

        <h1 className="welcome__attention not-a-game__attention">
          {getTranslation('welcomePage.attention', lang)}
        </h1>


        <p className="not-a-game__message">
            {getTranslation('game.message', lang)}
        </p>

       

        <ul className="not-a-game__list">
          {!players.length && (
             <li className="not-a-game__item">
                <i className='bx bxs-error-circle'></i>
                <span>{getTranslation('game.option.players', lang)}</span>
              </li>
          )}

          {!mode && (
          <li className="not-a-game__item">
          <i className='bx bxs-error-circle'></i>
            <span>{getTranslation('game.option.mode', lang)}</span>
          </li>
          )}
        </ul>
    </section>
  )
}