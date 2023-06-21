import classNames from "classnames";
import React, { useContext, useState } from "react";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import SquadsBar from "../SquadsBar/SquadsBarIndex";
import './PlayersTools.scss';

type Props = {
  setIsSaveSquad: (value: boolean) => void,
}

export const PlayersTools: React.FC<Props> = ({setIsSaveSquad}) => {
  const [squads, setSquads] = useLocaleStorage('squads', []);
  const [players, setPlayers] = useLocaleStorage('players', []);
  const [squad, setSquad] = useLocaleStorage('squad', {});
  const {isLight} = useContext(ThemeContext);
  const [isSquadsBar, setIsSquadsBar] = useState(false);

  const onPlayersReset = () => {
    setPlayers([]);
    setSquad({id: null});
  }

  const onSquadRemove = () => {
    setSquads((current) => [...current].filter((s) => s.id !== squad.id))
  }

  const onSquadBar = () => {
    setIsSquadsBar((current) => !current);
  }

  return (
    <div className="tools">
        <div 
      className={classNames(
        'tools__wrapper',
        'dark--tools',
        {'light--tools': isLight}
      )}
    >
      {squads.some((item) => item.id === squad.id) ? (
        <i className='bx bx-check-double' style={{color: isLight ? '#4276FB' : '#32FC4E'}} onClick={onSquadRemove}/>
      ) : (
        <i
          className='bx bx-bookmark'
          onClick={() => setIsSaveSquad(true)}
        />
      )}

      <i 
        className='bx bx-trash' 
        onClick={onPlayersReset}
      />

      <i
        className={classNames(
          'bx bxs-castle',
          {'dark--tools-active': isSquadsBar && !isLight},
          {'light--tools-active': isSquadsBar && isLight}
        )}

        id='squad'
        onClick={onSquadBar}
      />
    </div>

        {isSquadsBar && (
          <SquadsBar/>
        )}
    </div>
  )
}