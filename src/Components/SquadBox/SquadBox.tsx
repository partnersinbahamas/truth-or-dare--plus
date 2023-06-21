import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import SquadItemPlayer from "../SquadItem/SquadItemPlayer/SquadItemPlayerIndex";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import SquadBoxTools from "./SquadBoxTools/SquadBoxToolsIndex";
import IconsTool from "../IconsTool/IconsToolIndex";
import Empty from "../Empty/EmptyIndex";
import { Squad } from "../../Types/Squad";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";
import { getTranslation } from "../../Transtalion";
import './SquadBox.scss';

type Props = {
  squad: Squad,
  setModal: (value: boolean) => void,
  modal: boolean,
}

export const SquadBox: React.FC<Props> = ({squad, setModal, modal}) => {
  const [isPlayers, setIsPlayers] = useState(false);
  const [isIcons, setIsIcons] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  const [currentSquad, setSquad] = useLocaleStorage('squad', {id: null});
  const [squads, setSquads] = useLocaleStorage('squads', []);

  const [newSquadName, setNewSquadName] = useState(currentSquad.name);
  let squadName = useMemo(() => setNewSquadName(squad.name), [squad, currentSquad])

  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const playersOpen = () => {
    setIsPlayers(!isPlayers);
  }

  const onSquadNameChanged = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = event.target;
    setNewSquadName(value);
  }

  const onSquadNameSet = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setSquads((current) => [...current].map((sq) => {
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
    <section className={classNames('squadBox', 'dark__squadBox', {'light__squadBox': isLight})}>
      {currentSquad.id !== null ? (
        <>
        <div
        className={classNames(
          'squad', 'squad-sq', 'dark__squad', {'light__squad': isLight}
          // {'squad--active': squad.id === squad.id}
        )}
      >
        <div className="squad__top">
          {!isEdit ? (
          <h1 className="squad__title">{squad.name}</h1>
          ) : (
            <input
              className={classNames('squad__input', 'dark__squadBox--input', {'light__squadBox--input': isLight})}
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

        {/* {isPlayers && ( */}
        {squad.gamers && (
          <div className="squad__list">
          {squad.gamers.map((gamer) => (
            <SquadItemPlayer key={gamer.id}player={gamer} squad={squad}/>
          ))}
        </div>
        )}
        {/* )} */}
      </div>

      <SquadBoxTools
        setIcons={setIsIcons}
        icons={isIcons}
        setEdit={setIsEdit}
        edit={isEdit}
        setModal={setModal}
        modal={modal}
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