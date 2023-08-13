import React, { useContext } from "react";
import './Empty.scss';

import { LangContext } from "../../Providers/Language/LangProvider";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { getTranslation } from "../../Transtalion";
import classNames from "classnames";

type Props = {
  place: string,
}

export const Empty: React.FC<Props> = ({ place }) => {
  const { lang } = useContext(LangContext);
  const { isLight } = useContext(ThemeContext)

  return (
    <div
      className={classNames(
        'empty',
        'dark--empty',
        {'light--empty': isLight}
      )}
    >
      <i className='bx bx-calendar-x empty__img'/>

      {place === 'questions' && (
        <>
          <p className="empty__message">
            {getTranslation('empty.message-mode', lang)}
          </p>

          <span className="empty__message--ask">
            {getTranslation('empty.ask-mode', lang)}
          </span>
        </>
      )}

      {place === 'players' && (
        <>
          <p className="empty__message">
            {getTranslation('empty.message-players', lang)}
          </p>

          <span className="empty__message--ask">
            {getTranslation('empty.ask-players', lang)}
          </span>
        </>
      )}

      {place === 'squads' && (
        <>
          <p className="empty__message">
            {getTranslation('empty.message-squads', lang)}
          </p>
        </>
      )}

      {place === 'squadBox' && (
        <>
          <p 
            className="empty__message"
            style={{fontSize: '8px'}}
          >
            {getTranslation('empty.message-squadBox', lang)}
          </p>
        </>
      )}
    </div>
  )
}
