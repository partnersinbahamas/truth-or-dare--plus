import React, { useContext, useState } from "react";

import ErrorMessage from "../ErrorMessage/ErrorMessageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";
import { getTranslation } from "../../Transtalion";

import { Player } from "../../Types/Player";
import { Squad } from "../../Types/Squad";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";

import classNames from "classnames";
import './PlayersInput.scss';

export const PlayerInput = () => {
  const [query, setQuery] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [players, setPlayers] = useLocaleStorage<Player[]>('players', [])
  const [squad, setSquad] = useLocaleStorage<Squad | any>('squad', {});

  const { lang } = useContext(LangContext)
  const { isLight } = useContext(ThemeContext)

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const { value } = event.target;

    setErrorMessage('');
    setQuery(value);
  }

  const onQueryClear = () => {
    setQuery('');
  }

  const onAdd = (event: React.KeyboardEvent<HTMLInputElement>): void => {
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
      onQueryClear();
      setSquad({id: null});

      if (players.some((item: Player) => item.name === newPlayer.name)) {
        setErrorMessage(getTranslation('playerInput.warning-exist', lang));
      } else if (query.trim() === '') {
        setErrorMessage(getTranslation('playerInput.warning-noSpaces', lang))
      }else {
        setPlayers((current: Player[]) => [...current, newPlayer]);
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
