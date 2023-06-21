import React, { useContext, useEffect, useState } from "react"
import classNames from 'classnames';

import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import './WelcomePage.scss'
import Attention from "../../Components/Attention/AttentionIndex";
import Game from "../../Components/Game/GameIndex";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useLocalStorage } from "usehooks-ts";
import { action } from "../../Types/Mode";
import useLocaleStorage from "../../Components/Helpers/LocaleStorage/LocaleStorageIndex";
import NotAGame from "../../Components/NotAGame/NotAGameIndex";

type Props = {
  isMove: boolean,
  setMove: () => void,
}

export const WelcomePage: React.FC<Props> = ({isMove, setMove}) => {
  const {isLight} = useContext(ThemeContext);
  const {lang} = useContext(LangContext);

  const [players, setPlayers] = useLocaleStorage('players', []);
  const [mode, setMode] = useLocaleStorage('mode', []);

  const location = useLocation();

  return (
    <section className="welcome">
      <div 
        className={classNames(
          'welcome__top',
          {'welcome--move': isMove},
          'dark--welcome',
          {'light--welcome': isLight}
        )}
        onClick={setMove}
      >
        <div
          className={classNames(
            'welcome__wrapper',
            'dark',
            {'light': isLight}
          )}
        >

            <Routes>
            {location.pathname !== '/game' ? (
              <>
                <Route path={location.pathname} element={<Attention/>} />
              </>
            ) : (
              <>
                {!players.length || !mode ? (
                    <Route path={'game'} element={<NotAGame/>} />
                ) : (
                    <Route path={'game'} element={<Game />} />
                )}
              </>
            )}
          </Routes>

        </div>
      </div>
    </section>
  )
}
