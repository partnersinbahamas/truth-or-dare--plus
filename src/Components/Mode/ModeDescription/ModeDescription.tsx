import React, { useState, useContext } from "react";
import classNames from "classnames"
import { ModeType } from "../../../Types/Mode";
import { getTranslation } from "../../../Transtalion";
import { LangContext } from "../../../Providers/Language/LangProvider";
import './ModeDescription.scss'

type Props = {
  mode: ModeType,
  onDescriptionOpen: boolean,
  isLight: boolean,
}

export const ModeDescription: React.FC<Props> = ({mode, isLight}) => {
  const [isDescription, setIsDescription] = useState(false);
  const { lang } = useContext(LangContext);

  const onDescriptionOpen = () => {
    setIsDescription((current) => !current);
  }

  return (
    <div 
      className={classNames(
        'modeDescription',
        'dark--card-description',
        {'light--card-description': isLight},
      )}
      onClick={onDescriptionOpen}
    >
      <div className="modeDescription--title">
        {getTranslation('description.text', lang)}

        <p 
          className={classNames(
            'modeDescription--arrow',
            {'modeDescription--arrow-move': isDescription}
          )}
        >
          ➤
        </p>
      </div>

      {isDescription && (
        <p className="modeDescription--paragraph">
          {mode.description[lang]}
        </p>
      )}
    </div>
  )
}
