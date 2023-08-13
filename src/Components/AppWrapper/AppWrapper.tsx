import React, { useContext, useState, useMemo, useEffect, useCallback } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import classNames from "classnames"

import { action }  from '../../Types/Mode';
import { modes } from "../Helpers/Variables";
import { Player } from "../../Types/Player";

import WelcomePage from "../../Pages/WelcomePage/WelcomePageIndex";
import SelectBar from "../SelectBar/SelectBarIndex";
import HomePage from "../../Pages/HomePage/HomePageIndex";
import Squads from '../Squads/SquadsIndex'
import Settings from "../../Pages/Settings/SettingsIndex";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider.jsx";
import { LangContext } from "../../Providers/Language/LangProvider";

import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import { setDataWithIndexes } from "../Helpers/Helpers";
import { useSessionStorage } from "usehooks-ts";

export const AppWrapper = () => {
  const [isMove, setIsMove] = useState<boolean>(false);
  const location = useLocation();

  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const [modeType, setMode] = useLocaleStorage<string | null>('mode', null);
  const [players] = useLocaleStorage<Player[]>('players', []);

  const [questions, setQuestions] = useSessionStorage<action[]>('questions', []);
  const [dares, setDares] = useSessionStorage<action[]>('dares', []);
  const [playerIndex, setPlayerIndex] = useSessionStorage<number>('playerIndex', 0);

  const mode = modes.find((el) => el.type === modeType) || modes[0];

  const questionsData = useMemo(() => {
    if (mode.questions) {
      return mode.questions[lang].sort(() => Math.random() - 0.5)
    };

    return [];
  }, [modeType, lang]);

  const daresData = useMemo(() => {
    if (mode) {
      return mode.dare[lang].sort(() => Math.random() - 0.5);
    }

    return [];
  }, [modeType, lang]);

  useEffect(() => {
    if (modeType === null) {
      setQuestions([]);
      setDares([]);
    } else {
      setDataWithIndexes(setQuestions, questionsData);
      setDataWithIndexes(setDares, daresData);
    }
  }, [modeType, lang])
  
  const handleMoveChange = () => {
    if (location.pathname === '/game') {
      return;
    }

    setIsMove((current) => !current);
  }

  useEffect(() => {
    setPlayerIndex(0);
  }, [players]);

  // useEffect(() => {
  //   setMode(null); // needed to correct
  // }, [])

  return (
    <section 
      className={classNames(
        'App',
        'dark--app',
        {'light--app': isLight},
      )}
    >
      <div className="App__container">
      <WelcomePage isMove={isMove} setMove={handleMoveChange}/>
      
      <div className="App__wrapper">
        <Routes>
          <Route path='/home'>
            <Route index element={<HomePage />} />
            <Route path=':mode' element={<HomePage />} />
          </Route>
          <Route path='/' element={<Navigate to='home' />} />
          <Route path='settings' element={<Settings />} />
          <Route path='squads' element={<Squads />} />
        </Routes>
      </div>

      <SelectBar setIsMove={setIsMove}/>
      </div>
    </section>
  )
}
