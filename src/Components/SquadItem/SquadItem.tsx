import React, { useCallback, useContext, useEffect, useState } from "react";
import { Squad } from "../../Types/Squad";
import { Player } from "../../Types/Player";
import './SquadItem.scss';
import classNames from "classnames";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

type Props = {
  squad: Squad,
}

export const SquadItem: React.FC<Props> = ({ squad }) =>  {
    const [currentSquad, setCurrentSquad] = useLocaleStorage<Squad | any>('squad', {});
    const [players, setPlayers] = useLocaleStorage<Player[]>('players', []);
    const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);

    const { isLight } = useContext(ThemeContext);

    const onSquadSelect = (): void => {
      setCurrentSquad(squad);
      setPlayers(squad.gamers)
    }

    const onSetPlayer = useCallback((squad: Squad) => {
      if (squad.gamers) {
        setPlayers(squad.gamers);
      }
    }, [currentSquad]);
  
    const onSquadRemove = (): void => {
      setSquads((current: Squad[]) => [...current].filter((item) => item.id !== squad.id));
  
      const index = squads.findIndex((s: Squad) => s.id === squad.id);
      const prevSquad = squads[index - 1];
      const nextSquad = squads[index + 1];
  
      if (prevSquad === undefined && nextSquad) {
        setCurrentSquad(nextSquad);
        onSetPlayer(nextSquad);
      } 
  
      if (nextSquad === undefined && prevSquad) {
        setCurrentSquad(prevSquad);
        onSetPlayer(prevSquad);
      }
  
      if (nextSquad && prevSquad) {
        setCurrentSquad(prevSquad);
        onSetPlayer(prevSquad);
      }
  
      if (nextSquad === undefined && prevSquad === undefined) {
        setCurrentSquad({id: null});
        setPlayers([]);
      }
    }

    useEffect(() => {
      if (squad.gamers.length === 0) {
        setSquads((current: Squad[]) => [...current].filter((sq) => sq.id !== squad.id))
        onSquadRemove();
      }
    }, [squad, squads, currentSquad])

  return (
    <li
      className={classNames(
        'squad',
        'dark__squad',
        {'light__squad': isLight},
        {'dark__squad--active': currentSquad.id === squad.id && !isLight},
        {'light__squad--active': currentSquad.id === squad.id && isLight}
      )}
    >
      <i 
        className='bx bx-plus squad__cross'
        onClick={onSquadRemove}
      />

      <div
        className="squad__top"
        onClick={onSquadSelect}
      >
        <h1 className="squad__title">{squad.name}</h1>
        <i className={squad.iconUrl}></i>
      </div>
    </li>
  );
};
