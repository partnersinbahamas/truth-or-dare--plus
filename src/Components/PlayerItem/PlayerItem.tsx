import React, { useContext, useMemo, useState } from "react";
import { Player } from "../../Types/Player";
import { Squad } from "../../Types/Squad";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import classNames from "classnames";
import './PlayerItem.scss';

type Props = {
  player: Player,
};

export const PlayerItem: React.FC<Props> = ({ player }) => {
  const [players, setPlayers] = useLocaleStorage<Player[]>('players', [])
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>(player.name);
  const [squad, setSquad] = useLocaleStorage<Squad | any>('squad', {});
  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);
  const { isLight } = useContext(ThemeContext);

  const currentPlayerId = useMemo(
    () => players.findIndex(
      (playerCurr: Player) => playerCurr.name === player.name), [squad, squads],
  );

  const onDelete = (id: number) => {
    setPlayers((current: Player[]) => [...current].filter((p) => p.id !== id));
    setSquad({id: null});
  }

  const onEdit = () => {
    setIsEdit((current) => !current);
  }

  const onNewName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setNewName(value);
  }

  const isDB = ['DB', 'db', 'ДБ', 'дб', 'Дб'].includes(player.name);

  const onNameSave = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      setPlayers((current: Player[]) => [...current].map((item) => {
        if (item.id === player.id) {
          players[currentPlayerId].name = newName;
        }
        
        return item;
      }))

      if (squad.id !== null) {
        setSquad({...squad, gamers: [...players]});

        if (squads.some((item: Squad) => item.id === squad.id)) {
          setSquads((current: Squad[]) => [...current].map((sq) => {
            if (sq.id === squad.id) {
              sq.gamers = [...players];
            }

            return sq;
          }))
        }
      }
      
      setIsEdit(false);
    }
  }

  return (
    <li 
      className={classNames(
        'playerItem',
        'dark__player',
        {'light__player': isLight},
      )}
    >
      {isDB ? (
        <span className="playerItem__img playerItem__crown">👑</span>
      ) : (
        <i 
          className={classNames(
            'bx',
            'bx-child',
            'playerItem__img',
            'dark__player--img',
            {'light__player--img': isLight}
          )}
        />
      )}

      {isEdit ? (
        <input
          type="text"
          value={newName} 
          className={classNames(
            'playerItem__input',
            'dark__player--input',
            {'light__player--input': isLight},
          )}
          onChange={(event) => onNewName(event)}
          onKeyDown={(event) => onNameSave(event)}
        />
      ) : (
        <p 
          className={classNames(
            'playerItem__name',
            'dark__player--name',
            {'light__player--name': isLight}
          )}
        >
          {player.name}
        </p>
      )}

      <div className="playerItem__icons">
        {!isEdit ? (
          <>
            <i 
              className={classNames(
                'bx',
                'bxs-edit-alt',
                'playerItem__img',
                'dark__player--img',
                {'light__player--img': isLight},
              )}
              id='isActive'
              onClick={onEdit}
            />

            <i 
              className={classNames(
                'bx',
                'bx-message-alt-x',
                'playerItem__img',
                'dark__player--img',
                {'light__player--img': isLight}
              )}
              id='isActive'
              onClick={() => onDelete(player.id)}
            />
          </>
        ) : (
          <i 
            className={classNames(
              'bx',
              'bxs-message-alt-x',
              'playerItem__img',
              'dark__player--img',
              {'light__player--img': isLight}
            )}
            id='isActive'
            onClick={onEdit}
          />
        )}
      </div>
    </li>
  )
}
