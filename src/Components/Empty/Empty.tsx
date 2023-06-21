import React, { useContext } from "react";
import './Empty.scss';

import { LangContext } from "../../Providers/Language/LangProvider";
import { getTranslation } from "../../Transtalion";

type Props = {
  place: string,
}

export const Empty: React.FC<Props> = ({ place }) => {
  const {lang} = useContext(LangContext);

  return (
    <div className="empty">
      <i className='bx bx-calendar-x empty__img'></i>

      {place === 'questions' && (
        <>
          <p className="empty__message">
            {getTranslation('empty.message-mode', lang)}
          </p>

          <p className="empty__message--ask">
            {getTranslation('empty.ask-mode', lang)}
          </p>
        </>
      )}

      {place === 'players' && (
        <>
          <p className="empty__message">
            {getTranslation('empty.message-players', lang)}
          </p>

          <p className="empty__message--ask">
            {getTranslation('empty.ask-players', lang)}
          </p>
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
