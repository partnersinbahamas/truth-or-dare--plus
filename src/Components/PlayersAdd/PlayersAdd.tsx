import React, { useEffect, useState } from "react";
import './PlayersAdd.scss';
import { Player } from "../../Types/Player";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import Empty from "../Empty/EmptyIndex.jsx";
import PlayerInput from "../PlayersInput/PlayerInputIndex";
import PlayersList from "../PlayersList/PlayersListIndex";
import classNames from "classnames";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { useContext } from "react";
import PlayersTools from "../PlayersTools/PlayersToolsIndex";
import SquadNameInput from "../SquadNameInput/SquadNameInputIndex";

export const PlayersAdd = () => {
  const [players] = useLocaleStorage<Player[]>('players', []);
  const {isLight} = useContext(ThemeContext);
  const [isSaveSquad, setIsSaveSquad] = useState(false);

  return (
    <section className="playersAdd">
      <PlayerInput/>

      <div 
        className={classNames(
          'playersAdd__container',
          'dark__container',
          {'light__container': isLight}
        )}
      >
        {isSaveSquad ? (
          <SquadNameInput 
            setIsSaveSquad={setIsSaveSquad}
          />
        ) : (
          <>
            {!players.length ? (
              <Empty place='players'/>
            ) : (
              <PlayersList players={players}/>
            )}
          </>
        )}
      </div>

      <PlayersTools setIsSaveSquad={setIsSaveSquad}/>

    </section>
  )
}
