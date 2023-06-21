import React, { useContext, useState } from "react";
import { navigations } from "../../Components/Helpers/Variables";
import NavigationItem from "../../Components/NavigationItem/NavigationItemIndex";
import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";
import { Player } from "../../Types/Player";
import './CustomActionModal.scss';

type Props = {
  isQuestion: boolean,
  player: Player,
}

export const CustomActionModal: React.FC<Props> = ({isQuestion, player}) => {
  const [isMove, setIsMove] = useState(false);
  const homeNav = navigations.find((nav) => nav.to === 'settings');

  const { lang } = useContext(LangContext)
  return (
    <div className="customModal dark--customModal">
      <div className="customModal__wrapper">
        <h1>
          {`
            ${getTranslation('customModal.message.part-1', lang)}
          `}
          <span> 
            {getTranslation(!isQuestion ? 'button.dare' : 'button.truth', lang)}
          </span>

          {` ${getTranslation('customModal.message.part-2', lang)}`}
          <span> {player.name}</span>
        </h1>

        <div className="customModal__nav">
          <NavigationItem nav={homeNav} setIsMove={setIsMove}/>
        </div>
      </div>
    </div>
  )
}