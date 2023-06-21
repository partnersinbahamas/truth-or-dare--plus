import React, { useContext } from "react";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import classNames from "classnames";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

type Props = {
  sortActions: () => void,
}

export const ActionsTools: React.FC<Props> = ({ sortActions }) => {
  const {isLight} = useContext(ThemeContext);
  const [currentMode, setMode] = useLocaleStorage<string>('mode', {});

  return (
    <div className="tools">
      <div 
        className={classNames(
          'tools__wrapper',
          'dark--tools',
          {'light--tools': isLight}
        )}
        style={{gap:' 25px'}}
      >
        <i className='bx bx-reset' onClick={sortActions}></i>
        <i className='bx bx-trash' onClick={() => setMode(null)}/>
      </div>
    </div>
  )
}
