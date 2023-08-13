import React, { useContext, useState } from "react"
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex"
import SquadItem from "../SquadItem/SquadItemIndex";
import Empty from "../Empty/EmptyIndex";
import SquadBox from "../SquadBox/SquadBoxIndex";
import Modal from "../../Modals/Modal/ModalIndex";
import PlayerInputModal from "../../Modals/PlayerInputModal.jsx/PlayerInputModalIndex";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";
import { Squad } from "../../Types/Squad";
import { getTranslation } from "../../Transtalion";

import classNames from "classnames";
import './Squads.scss';

export const Squads = () => {
  const [squad, setSquad] = useLocaleStorage<Squad | any>('squad', {});
  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);
  const [isModal, setIsModal] = useState<boolean>(false);

  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  return (
    <section className="squads">
      <div className="squads__sheel">
        <h1
          className="squads__title"
          style={{color: isLight ? '#4276FB' : '#AB1099', transition: '1s'}}
        >
          {getTranslation('squadBox.squads', lang)}
        </h1>
        <ul
          className={classNames(
            'squads__wrapper', 
            'dark__squads',
            {'light__squads': isLight}
          )}
        >
          {!squads.length ? (
            <Empty place={'squads'}/>
          ) : (
            <>
              {squads.map((squad) => ( 
                <SquadItem key={squad.name} squad={squad}/>
              ))}
            </>
          )}
        </ul>
      </div>

      {isModal && (
        <Modal setModal={setIsModal}>
          <PlayerInputModal setModal={setIsModal}/>
        </Modal>
      )}

      <div>
        <h1
          className='squads__title'
          style={{color: isLight ? '#4276FB' : '#AB1099', transition: '1s'}}
        >
          {getTranslation('squadBox.tools', lang)}
        </h1>
        
        <SquadBox squad={squad} setModal={setIsModal} />
      </div>
    </section>
  )
}