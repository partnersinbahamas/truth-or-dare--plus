import React from "react";
import { useSearchParams } from "react-router-dom";
import useLocaleStorage from "../../Components/Helpers/LocaleStorage/LocaleStorageIndex.jsx";
import Modes from "../../Components/Modes/ModesIndex.jsx";
import PlayersAdd from "../../Components/PlayersAdd/PlayersAddIndex.jsx";

import { modes } from "../../Components/Helpers/Variables.jsx";
import Actions from "../../Components/Actions/ActionsIndex";
import { ModeType } from "../../Types/Mode.js";

import './HomePage.scss'

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  const [currentMode, setMode] = useLocaleStorage<string | null>('mode', null);

  const mode = modes.find((item) =>item.type === currentMode) || null;

 return (
    <div className="home">
      <Modes/>
        <div className="home__wrapper">
          <PlayersAdd/>
          <Actions mode={mode}/>
        </div>
    </div>
  );
};
