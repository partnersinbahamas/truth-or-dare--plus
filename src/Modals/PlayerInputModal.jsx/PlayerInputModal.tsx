import React, { useContext, useState } from "react";
import useLocaleStorage from "../../Components/Helpers/LocaleStorage/LocaleStorageIndex";
import { getTranslation } from "../../Transtalion";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

import { LangContext } from "../../Providers/Language/LangProvider";
import ErrorMessage from "../../Components/ErrorMessage/ErrorMessageIndex";
import Button from "../../Components/Buttons/Button/ButtonIndex";

import { Squad } from "../../Types/Squad";
import { Player } from "../../Types/Player";
import classNames from "classnames";
import './PlayerInputModal.scss';

type Props = {
  setModal: (value: boolean) => void,
}

export const PlayerInputModal: React.FC<Props> = ({ setModal }) => {
  const [squad, setSquad] = useLocaleStorage<Squad | any>('squad', {});
  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);
  const [players, setPlayers] = useLocaleStorage<Player[]>('players', []);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [query, setQuery] = useState<string>('');

  const { lang } = useContext(LangContext);
  const { isLight } = useContext(ThemeContext);

  function onParamChange(): void {
    let newId: number = 0;

    for (let i = 0; i < squad.gamers.length; i++) {
      if (squad.gamers[i].id > newId) {
        newId = squad.gamers[i].id;
      } 
    }

    const preparetedPlayers = [...squad.gamers, {id: newId + 1, name: query}];

    if (query.length <= 8 && query.trim() !== '') {
      setSquads((current: Squad[]) => [...current].map((sq) => {
        if (sq.id === squad.id) {
          sq.gamers = preparetedPlayers
        }
  
        return sq;
      }))
  
      setSquad({...squad, gamers: preparetedPlayers});
      setPlayers(preparetedPlayers);
      setModal(false);
    } else if (query.trim() === '') {
      setErrorMessage(getTranslation('playerInput.warning-noSpaces', lang))
    } else {
      setErrorMessage(getTranslation('playerInput.warning-8symbol', lang));
    }
  }

  const onQuerySet = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onParamChange();
    }
  }

  const onQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();
    setErrorMessage('');
    const {value} = event.target;
    setQuery(value);
  }

  const onQueryRemove = () => {
    setErrorMessage('');
    setQuery('');
  }

  return (
    <div
      className={classNames(
        'playerInputModal',
        'dark--playerInputModal',
        {'light--playerInputModal': isLight})}
    >
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
          onChange={onQueryChange}
          onKeyDown={onQuerySet}
        />

        {!query.length ? (
          <i className='bx bxs-book-add input__img'/>
        ) : (
          <i className='bx bxs-message-alt-x input__img' onClick={onQueryRemove}></i>
        )}
      </div>

      <Button action={onParamChange} title='next'/>

      <div className="playerInputModal__error">
        {errorMessage && (
          <ErrorMessage message={errorMessage}/>
        )}
      </div>
    </div>
  )
}
