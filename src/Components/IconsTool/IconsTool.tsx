import classNames from "classnames";
import React, { useContext } from "react";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import './IconsTool.scss';

const iconsUrl = [
    'bx bxs-sushi', 'bx bxl-meta', 'bx bx-lemon',
    'bx bxs-bowl-rice', 'bx bxs-party', 'bx bxl-netlify',
    'bx bx-injection', 'bx bx-money-withdraw', 'bx bxs-balloon',
    'bx bxs-coffee-bean', 'bx bx-shower', 'bx bxs-color', 'bx bxl-postgresql',
    'bx bxl-xing', 'bx bx-cheese', 'bx bxl-sketch', 'bx bxl-docker', 'bx bxs-ghost',
    'bx bx-accessibility', 'bx bxs-compass',
]

export const IconsTool = () => {
    const [currentSquad, setSquad] = useLocaleStorage('squad', {});
    const [squads, setSquads] = useLocaleStorage('squads', []);
    const { isLight } = useContext(ThemeContext);

    const onIconChange = (icon) => {
      setSquads((current) => current.map((squad) => {
        if (squad.id === currentSquad.id) {
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
    <div className={classNames('iconsTool', 'dark__squadBox--tools', {'light__squadBox--tools': isLight})}>
      {iconsUrl.map((icon) => (
        <div className="iconsTool__icon" key={icon}>

        {icon === currentSquad.iconUrl && (
          <i 
            className='bx bx-check-double iconsTool__icon-check'
            style={{color: isLight ?'#4276FB' :'rgb(50, 252, 78)'}}
          />
        )}

          <i
            className={`${icon} iconsTool__icon-img`}
            onClick={() => onIconChange(icon)}
          />
        </div>
      ))}
    </div>
  )
}