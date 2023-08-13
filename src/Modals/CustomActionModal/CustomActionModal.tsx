import React, { useContext, useState } from "react";
import { navigations } from "../../Components/Helpers/Variables";
import NavigationItem from "../../Components/NavigationItem/NavigationItemIndex";
import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

import { Player } from "../../Types/Player";
import { Nav } from '../../Types/Nav';

import classNames from "classnames";
import './CustomActionModal.scss';

type Props = {
  isQuestion: boolean,
  player: Player,
}

export const CustomActionModal: React.FC<Props> = ({ isQuestion, player }) => {
  const [isMove, setIsMove] = useState<boolean>(false);
  const homeNav = navigations.find((nav: Nav) => nav.to === 'settings')!;

  const { lang } = useContext(LangContext);
  const { isLight } = useContext(ThemeContext);

  return (
    <div
      className={classNames(
        'customModal',
        'dark--customModal',
        { 'light--customModal': isLight}
      )}
    >
      <div className="customModal__wrapper">
        <h1>
          {`${getTranslation('customModal.message.part-1', lang)} `}

          <span> 
            {getTranslation(!isQuestion ? 'button.dare' : 'button.truth', lang)}
          </span>

          {` ${getTranslation('customModal.message.part-2', lang)}`}
          <span>{` ${player.name}`}</span>
        </h1>

        <div className="customModal__nav">
          <NavigationItem nav={homeNav} setIsMove={setIsMove}/>
        </div>
      </div>
    </div>
  )
}
