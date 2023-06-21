import classNames from "classnames";
import React, { useContext, useEffect } from "react"
import { ThemeContext } from "../../../Providers/Theme/ThemeProvider";
import { Player } from "../../../Types/Player";
import { Squad } from "../../../Types/Squad";
import useLocaleStorage from "../../Helpers/LocaleStorage/LocaleStorageIndex";
import './SquadItemPlayer.scss';

type Props = {
  player: Player,
  squad: Squad,
}

export const SquadItemPlayer: React.FC<Props> = ({player, squad}) => {
  const { name, id } = player;

  const [squads, setSquads] = useLocaleStorage('squads', []);
  const [currentSquad, setSquad] = useLocaleStorage('squad', {});
  const [players, setPlayers] = useLocaleStorage('players', []);

  const { isLight } = useContext(ThemeContext);

  const onPlayerRemove = (playerId: number) => {
    setSquads((current: Squad[]) => [...current].map((sq: Squad) => {
      if (sq.id === squad.id) {
        sq.gamers = sq.gamers.filter((player) => player.id !== playerId)
      }
      
      return sq;
    }))

    let filteredGamers = currentSquad.gamers.filter((sq: Squad) => sq.id !== playerId)

    if (filteredGamers.length) {
      setSquad({
        ...currentSquad,
        gamers: filteredGamers,
      });
    } else {
      setSquad({id: null})
    }

    setPlayers(filteredGamers);
  }

  return (
    <div className={classNames(
      'squadPlayer',
      'dark__squad--playerItem',
      {'light__squad--playerItem': isLight}
      )}
    >
      <p className="squadPlayer__name">{name}</p>

      <i className='bx bx-plus' onClick={() => onPlayerRemove(id)}></i>
    </div>
  )
}