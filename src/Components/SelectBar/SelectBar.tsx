import React, { useContext } from "react"
import SelectLanguage from "../SelectLanguage/SelectLanguageIndex";
import SelectTheme from "../SelectTheme/SelectItemIndex";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import Navigation from "../Navigation/NavigationIndex";

import classNames from 'classnames';
import '../SelectBar/SelectBar.scss';

type Props = {
  setIsMove: (value: boolean) => void,
}

export const SelectBar: React.FC<Props> = ({ setIsMove }) => {
  const { isLight } = useContext(ThemeContext);

  return (
    <div 
      className={classNames(
       'selectBar',
        'dark',
        {'light' : isLight}
      )}
    >
      <div className="selectBar__wrapper">
        <SelectLanguage/>
          <Navigation setIsMove={setIsMove}/>
        <SelectTheme/>
      </div>
  </div>
  )
}
