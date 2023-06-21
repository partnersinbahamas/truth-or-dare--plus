import React from "react";
import PlayerItem from "../PlayerItem/PlayerItemIndex";
import { Player } from "../../Types/Player";
import './PlayersList.scss';

type Props = {
  players: Player[],
}

export const PlayersList: React.FC<Props> = ({players}) => {
  return (
    <ul className="playersList">
      {players.map((p) => (
        <PlayerItem key={p.id} player={p}/>
      ))}
    </ul>
  )
}
