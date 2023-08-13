import classNames from "classnames";
import React, { useContext } from "react"
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

  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);
  const [currentSquad, setSquad] = useLocaleStorage<Squad | any>('squad', {});
  const [players, setPlayers] = useLocaleStorage<Player[]>('players', []);

  const { isLight } = useContext(ThemeContext);

  const onPlayerRemove = (playerId: number): void => {
    setSquads((current: Squad[]) => [...current].map((sq: Squad) => {
      if (sq.id === squad.id) {
        sq.gamers = sq.gamers.filter((player) => player.id !== playerId)
      }
      
      return sq;
    }))

    let filteredGamers = currentSquad.gamers.filter((sq: Squad) => sq.id !== playerId)

    if (filteredGamers.length) {
      setSquad((current: Squad) => ({
        ...current,
        gamers: filteredGamers,
      }));
    } else {
      setSquad({id: null})
    }

    setPlayers(filteredGamers);
  }

  return (
    <li
      className={classNames(
        'squadPlayer',
        'dark__squad--playerItem',
        {'light__squad--playerItem': isLight}
      )}
    >
      <p className="squadPlayer__name">{name}</p>

      <i className='bx bx-plus' onClick={() => onPlayerRemove(id)}/>
    </li>
  )
}
