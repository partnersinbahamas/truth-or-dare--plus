import React from "react";
import { useSearchParams } from "react-router-dom";
import Modes from "../../Components/Modes/ModesIndex.jsx";
import PlayersAdd from "../../Components/PlayersAdd/PlayersAddIndex.jsx";
import './HomePage.scss'
import { modes } from "../../Components/Helpers/Variables.jsx";
import Questions from "../../Components/Actions/ActionsIndex";
import useLocaleStorage from "../../Components/Helpers/LocaleStorage/LocaleStorageIndex.jsx";

export const HomePage = () => {
  const [searchParams] = useSearchParams();
  // const modeType = searchParams.get('mode') || '';
  const [currentMode, setMode] = useLocaleStorage('mode', {});

  const mode = modes.find((item) =>item.type === currentMode);

 return (
    <div className="home">
      <Modes/>
        <div className="home__wrapper">
          <PlayersAdd/>

          <Questions mode={mode}/>
        </div>
    </div>
 )
}