import React, { useCallback, useContext } from "react";
import { Squad } from "../../../Types/Squad";
import { Player } from "../../../Types/Player";
import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";
import useLocaleStorage from "../../Helpers/LocaleStorage/LocaleStorageIndex";
import './SquadBar.scss'

type Props = {
  currentSquad: Squad;
}

export const SquadBar: React.FC<Props> = ({currentSquad}) => {
  const [players, setPlayers] = useLocaleStorage<Player[]>('players', []);
  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);
  const [squad, setSquad] = useLocaleStorage<Squad | any>('squad', {});

  const {isLight} = useContext(ThemeContext);

  const onSetPlayer = useCallback((squad: Squad): void => {
    if (squad.gamers) {
      setPlayers(squad.gamers);
    }
  }, [squad]);

  const onSquadRemove = (): void => {
    setSquads((current: Squad[]) => [...current].filter((item) => item.id !== squad.id));

    const index = squads.findIndex((s: Squad) => s.id === squad.id);
    const prevSquad = squads[index - 1];
    const nextSquad = squads[index + 1];

    if (prevSquad === undefined && nextSquad) {
      setSquad(nextSquad);
      onSetPlayer(nextSquad);
    } 

    if (nextSquad === undefined && prevSquad) {
      setSquad(prevSquad);
      onSetPlayer(prevSquad);
    }

    if (nextSquad && prevSquad) {
      setSquad(prevSquad);
      onSetPlayer(prevSquad);
    }

    if (nextSquad === undefined && prevSquad === undefined) {
      setSquad({id: null});
      setPlayers([]);
    }
  }

  const onSquadSelect = (): void => {
    setSquad(currentSquad);
    setPlayers(currentSquad.gamers)
  }

 return (
  <div 
    className="squadBar"
    onDoubleClick={onSquadRemove}
    onClick={onSquadSelect}
  >
    <i className={currentSquad.iconUrl}/>

    <span
      style={{color: isLight ? '#4276FB' : '#AB1099', transition: '1.5s'}}
    >
      {currentSquad.name}
    </span>
  </div>
 )
}
