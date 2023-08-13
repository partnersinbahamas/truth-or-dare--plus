import React, { useContext, useState } from "react";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";

import ErrorMessage from "../ErrorMessage/ErrorMessageIndex";
import CrossButton from "../Buttons/CrossButton/CrossButtonInput";

import { Squad } from "../../Types/Squad";
import { Player } from "../../Types/Player";

import classNames from "classnames";
import './SquadNameInput.scss';

type Props = {
  setIsSaveSquad: (value: any) => void,
}

export const SquadNameInput: React.FC<Props> = ({ setIsSaveSquad }) => {  
  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);
  const [players] = useLocaleStorage<Player[]>('players', []);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [squad, setSquad] = useLocaleStorage<Squad | any>('squad', {});
  const [squadName, setSquadName] = useState<string>('');

  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext)

  const onSquadNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.preventDefault();

    const { value } = event.target;
    setSquadName(value);
  }

  const onSaveSquad = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      if (squads.some((item: Squad) => item.name === squadName)) {
        setErrorMessage(getTranslation('squadNameInput.error-exist', lang));
      } else if (players.length < 2) {
        setErrorMessage(getTranslation('squadNameInput.error-length', lang));
      } else {

        let maxId = squads.reduce((max: number, obj: Squad) => {
          return obj.id > max ? obj.id : max;
        }, -1);

        const newSquad: any = {
          id: maxId + 1,
          name: squadName,
          gamers: players,
          iconUrl: 'bx bxs-shield-alt-2',
        }
          
        setSquad(newSquad);
        setSquads(current => [...current, newSquad]);
        setSquadName('');
        setIsSaveSquad(false);
      }
    }
  }

  return (
    <div className="squadName">
      <div className="squadName__wrapper">
        <div 
          className={classNames(
            'dark__input',
            'input',
            'input__squad',
            {'light__input': isLight}
          )}
        >
          <input 
            type="text"
            className={classNames(
              'dark__input--field-squad',
              'input__field',
              'input__field--squad',
              {'light__input--field': isLight},
              {'light__input--field-squad': isLight},
            )}
            placeholder={getTranslation('squadNameInput.placeHolder', lang)}
            value={squadName}
            maxLength={6}
            onClick={(event) => event.preventDefault()}
            onChange={(event) => onSquadNameChange(event)}
            onKeyDown={(event) => onSaveSquad(event)}
          />

          {!squadName.length ? (
            <i className='bx bxs-book-add input__img'></i>
          ) : (
            <i
              className='bx bxs-message-alt-x input__img'
              onClick={() => setSquadName('')}
            />
          )}
        </div>

        {errorMessage && (
          <ErrorMessage message={errorMessage}/>
        )}
      </div>

      <CrossButton action={() => setIsSaveSquad(false)}/>
    </div>
  )
}
