import classNames from "classnames";
import React, { useContext } from "react";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { Squad } from "../../Types/Squad";
import { iconsUrl } from "../Helpers/Variables";
import './IconsTool.scss';

export const IconsTool = () => {
  const [currentSquad, setSquad] = useLocaleStorage<Squad | any>('squad', {});
  const [squads, setSquads] = useLocaleStorage<Squad[]>('squads', []);
  const { isLight } = useContext(ThemeContext);

  const onIconChange = (icon: string) => {
    setSquads((current) => current.map((squad) => {
      if (currentSquad && squad.id === currentSquad.id) {
        squad.iconUrl = icon;
      }

      return squad;
    }))

    setSquad({
      ...currentSquad,
      iconUrl: icon
    })
  }

  return (
    <ul
      className={classNames(
        'iconsTool',
        'dark__squadBox--tools',
        {'light__squadBox--tools': isLight},
      )}
    >
      {iconsUrl.map((icon) => (
        <li className="iconsTool__icon" key={icon}>

          {icon === currentSquad.iconUrl && (
            <i 
              className={classNames(
                'bx bx-check-double',
                'iconsTool__icon-check',
              )}
              style={{color: isLight ? '#4276FB' : '#32FC4E'}}
            />
          )}

          <i
            className={`${icon} iconsTool__icon-img`}
            onClick={() => onIconChange(icon)}
          />
        </li>
      ))}
    </ul>
  )
}