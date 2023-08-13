import React, { useContext, useMemo, useState } from "react";
import SquadItemPlayer from "../SquadItem/SquadItemPlayer/SquadItemPlayerIndex";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import SquadBoxTools from "./SquadBoxTools/SquadBoxToolsIndex";
import IconsTool from "../IconsTool/IconsToolIndex";
import Empty from "../Empty/EmptyIndex";

import { Squad } from "../../Types/Squad";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";
import { getTranslation } from "../../Transtalion";

import classNames from "classnames";
import './SquadBox.scss';

type Props = {
  squad: Squad,
  setModal: (value: boolean) => void,
}

export const SquadBox: React.FC<Props> = ({ squad, setModal }) => {
  const [isPlayers, setIsPlayers] = useState<boolean>(false);
  const [isIcons, setIsIcons] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [currentSquad, setSquad] = useLocaleStorage<Squad | any>('squad', {});
  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);

  const [newSquadName, setNewSquadName] = useState<string>(currentSquad.name);
  let squadName = useMemo(() => setNewSquadName(squad.name), [squad, currentSquad])

  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const playersOpen = (): void => {
    setIsPlayers((current: boolean) => !current);
  }

  const onSquadNameChanged = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    setNewSquadName(value);
  }

  const onSquadNameSet = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      setSquads((current: Squad[]) => [...current].map((sq) => {
        if (sq.id === currentSquad.id) {
          sq.name = newSquadName;
        }

        return sq;
      }))

      setSquad({
        ...currentSquad,
        name: newSquadName,
      })

      setIsEdit(false);
    }
  }

  return (
    <section
      className={classNames(
        'squadBox',
        'dark__squadBox',
        {'light__squadBox': isLight}
      )}
    >
      {currentSquad.id !== null ? (
        <>
          <div
            className={classNames(
            'squad',
            'squad-sq',
            'dark__squad',
            {'light__squad': isLight},
            )}
          >
            <div className="squad__top">
              {!isEdit ? (
                <h1 className="squad__title">{squad.name}</h1>
              ) : (
                <input
                  className={classNames(
                    'squad__input',
                    'dark__squadBox--input',
                    {'light__squadBox--input': isLight}
                  )}
                  value={newSquadName} 
                  onChange={(event) => onSquadNameChanged(event)}
                  onKeyDown={(event) => onSquadNameSet(event)}
                  maxLength={6}
                />
              )}

              <i className={squad.iconUrl}></i>
            </div>

            <p 
              style={{color: isLight ? '#4276FB': '#AB1099', transition: '1s'}}
              onClick={playersOpen}
            >
              {getTranslation('squadBox.players', lang)}
            </p>

            {squad.gamers && (
              <ul className="squad__list">
                {squad.gamers.map((gamer) => (
                  <SquadItemPlayer key={gamer.id}player={gamer} squad={squad}/>
                ))}
              </ul>
            )}
          </div>

          <SquadBoxTools
            setIcons={setIsIcons}
            icons={isIcons}
            setEdit={setIsEdit}
            edit={isEdit}
            setModal={setModal}
          />

          <div className="squadBox__container">
            {isIcons && (
              <IconsTool />
            )}
          </div>
        </>
      ) : (
        <div className="squadBox__empty">
          <Empty place='squadBox'/>
        </div>
      )}
    </section>
  )
}
