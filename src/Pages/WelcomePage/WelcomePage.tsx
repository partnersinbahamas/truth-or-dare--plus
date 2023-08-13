import React, { useContext } from "react"
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

import Attention from "../../Components/Attention/AttentionIndex";
import Game from "../../Components/Game/GameIndex";
import { Route, Routes, useLocation } from "react-router-dom";
import useLocaleStorage from "../../Components/Helpers/LocaleStorage/LocaleStorageIndex";
import NotAGame from "../../Components/NotAGame/NotAGameIndex";

import { Player } from "../../Types/Player";
import { ModeType } from "../../Types/Mode";

import classNames from 'classnames';
import './WelcomePage.scss'

type Props = {
  isMove: boolean,
  setMove: () => void,
}

export const WelcomePage: React.FC<Props> = ({isMove, setMove}) => {
  const {isLight} = useContext(ThemeContext);

  const [players, setPlayers] = useLocaleStorage<Player[]>('players', []);
  const [mode, setMode] = useLocaleStorage<string | null>('mode', '');

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
