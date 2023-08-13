import React, { useContext } from "react";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";

import { getTranslation } from "../../Transtalion";
import { Player } from "../../Types/Player";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";

import classNames from "classnames";
import './NotAGame.scss';

export const NotAGame = () => {
  const [players, setPlayers] = useLocaleStorage<Player[]>('players', []);
  const [modeType, setModeType] = useLocaleStorage<string | null>('mode', null);

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

        {!modeType && (
          <li className="not-a-game__item">
            <i className='bx bxs-error-circle'/>
            <span>{getTranslation('game.option.mode', lang)}</span>
          </li>
        )}
      </ul>
    </section>
  )
}
