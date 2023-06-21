import React from "react";
import { ModeType } from "../../Types/Mode";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import ModeDescription from "./ModeDescription/ModeDescriptionIndex";
import classNames from "classnames";
import '../Mode/Mode.scss';
import { useContext } from "react";

type Props = {
  mode: ModeType,
}

export const Mode: React.FC<Props> = ({mode}) => {
  const {isLight} = useContext(ThemeContext);
  const [modeType, setMode] = useLocaleStorage('mode', {});

  const onModeSelect = (modeType: string | null) => {
    setMode(modeType);
  }

  return (
    <div className='mode'>
      <div 
        className={classNames(
          'mode__card',
          'dark--card',
          {'light--card': isLight},
          {'light--card--selected': isLight && modeType === mode.type},
          {'dark--card--selected': !isLight && modeType === mode.type},
        )}

        onClick={() => {
          if (modeType === mode.type) {
            onModeSelect(null)
          } else {
            onModeSelect(mode.type)
          }
        }}
      >
      <i className={`bx bx-${mode.imgType}`} ></i>
      <h1>{mode.title}</h1>
      </div>

      <ModeDescription mode={mode} isLight={isLight}/>
    </div>
  )
}
