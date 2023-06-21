import React, { useContext, useEffect, useState } from "react";
import { Player } from "../../Types/Player";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import ErrorMessage from "../ErrorMessage/ErrorMessageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";
import { getTranslation } from "../../Transtalion";
import { Squad } from "../../Types/Squad";
import './PlayersInput.scss';
import classNames from "classnames";


type Props = {
  setSquad: (value: Squad) => void,
  // squadName: string,
}

export const PlayerInput: React.FC<Props> = ({/*squadName*/}) => {
  const [query, setQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [players, setPlayers] = useLocaleStorage<Player[]>('players', [])
  const [squad, setSquad] = useLocaleStorage('squad', {});

  const {lang} = useContext(LangContext)
  const {isLight} = useContext(ThemeContext)

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const { value } = event.target;
    setErrorMessage('');
    setQuery(value);
  }

  const onQueryClear = () => {
    setQuery('');
  }

  const onAdd = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let newId = -1;

    for (let i = 0; i < players.length; i++) {
      const current = players[i];

      if (current.id > newId) {
        newId = current.id;
      }
    }

    const newPlayer: Player = {
      id: newId + 1,
      name: query,
    }

    if (event.key === 'Enter') {
      // const newSquad: any = {
      //   id: squads.length,
      //   name: squadName = 'TEMP-SQUAD',
      //   gamers: [...players],
      // }

      // newSquad.gamers.push(newPlayer);
      onQueryClear();
      setSquad({id: null});


      if (players.some((item) => item.name === newPlayer.name)) {
        setErrorMessage(getTranslation('playerInput.warning-exist', lang));

      } else if (query.trim() === '') {
        setErrorMessage(getTranslation('playerInput.warning-noSpaces', lang))
      }else {
        setPlayers(current => [...current, newPlayer]);
      }
    };
  }

  return (
    <>
      <div 
        className={classNames(
          'dark__input',
          'input',
          {'light__input': isLight}
        )}
      >
        <input 
          type="text"
          className={classNames(
            'dark__input--field',
            'input__field',
            {'light__input--field': isLight}
          )}
          placeholder={getTranslation('playerInput.placeholder', lang)}
          value={query}
          onChange={(event) => onQueryChange(event)}
          onKeyDown={(event) => onAdd(event)}
        />

        {!query.length ? (
          <i className='bx bxs-book-add input__img'></i>
        ) : (
          <i
            className='bx bxs-message-alt-x input__img'
            onClick={onQueryClear}
            style={{cursor: 'pointer'}}
          />
        )}
      </div>

      {errorMessage && (
        <ErrorMessage message={errorMessage}/>
      )}
    </>
  )
}