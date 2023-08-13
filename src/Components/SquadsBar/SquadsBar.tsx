import React, { useContext } from "react";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import SquadBar from "./SquadBar/SquadBarIndex";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";
import { getTranslation } from "../../Transtalion";
import { Squad } from "../../Types/Squad";

import classNames from "classnames";
import './SquadsBar.scss';

export const SquadsBar = () => {
  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);

  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext)

  return (
    <div 
      className={classNames(
        'squadsBar',
        'dark--tools',
        {'light--tools': isLight})}
      >
        {!squads.length ? (
          <p>{getTranslation('squad.empty', lang)}</p>
        ) : (
          <ul 
            className="squadsBar__list" 
            style={{justifyContent: squads.length %2 === 1 ? 'center': ''}}
          >
            {squads.map((currentSquad) => (
              <SquadBar key={currentSquad.name} currentSquad={currentSquad}/>
            ))}
          </ul>
      )}
    </div>
  )
}
