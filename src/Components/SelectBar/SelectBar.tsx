import React, { useContext } from "react"
import { SelectLanguage } from "../SelectLanguage/SelectLanguage";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { SelectTheme } from "../SelectTheme/SelectTheme.jsx";
import Navigation from "../Navigation/NavigationIndex";
import Tag from '../Tag/TagIndex.jsx'
import '../SelectBar/SelectBar.scss';
import classNames from 'classnames';
import { CodeFixAction } from "typescript";


type Props = {
  isMove: boolean,
  setIsMove: (value: boolean) => void,
}

export const SelectBar: React.FC<Props> = ({isMove, setIsMove}) => {
  const {isLight, setIsLight} = useContext(ThemeContext);

  return (
    <div 
    className={classNames('selectBar', 'dark', {'light' : isLight})}
    >
      <div className="selectBar__wrapper">
        <SelectLanguage />
        {/* <Tag isMove={isMove}/> */}
        <Navigation setIsMove={setIsMove}/>
        <SelectTheme/>
      </div>
  </div>
  )
}
