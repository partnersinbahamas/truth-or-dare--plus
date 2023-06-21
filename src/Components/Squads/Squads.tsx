import React, { useContext, useState } from "react"
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex"
import SquadItem from "../SquadItem/SquadItemIndex";
import Empty from "../Empty/EmptyIndex";
import SquadBox from "../SquadBox/SquadBoxIndex";
import Modal from "../../Modals/Modal/ModalIndex";
import PlayerInputModal from "../../Modals/PlayerInputModal.jsx/PlayerInputModalIndex";
import classNames from "classnames";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import './Squads.scss';

export const Squads = () => {
  const [squad, setSquad] = useLocaleStorage('squad', {});
  const [squads, setSquads] = useLocaleStorage('squads', []);
  const [isModal, setIsModal] = useState(false);

  const { isLight } = useContext(ThemeContext);

  return (
    <section className="squads">
    <div className="squads__sheel">
    <h1 className="squads__title" style={{color: isLight ? '#4276FB' : '#AB1099', transition: '1s'}}>Squads</h1>
     <div 
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
     </div>
    </div>

    {isModal && (
      <Modal setModal={setIsModal} modal={isModal}>
        <PlayerInputModal setModal={setIsModal}/>
      </Modal>
    )}

      <div>
        <h1 className='squads__title' style={{color: isLight ? '#4276FB' : '#AB1099', transition: '1s'}}>Squad tools</h1>
        <SquadBox squad={squad} setModal={setIsModal} modal={isModal}/>
      </div>
    </section>
  )
}