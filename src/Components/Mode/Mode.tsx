import React from "react";
import { ModeType } from "../../Types/Mode";
import useLocaleStorage from "../Helpers/LocaleStorage/LocaleStorageIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import ModeDescription from "./ModeDescription/ModeDescriptionIndex";
import classNames from "classnames";
import { useContext } from "react";
import { useSessionStorage } from "usehooks-ts";
import '../Mode/Mode.scss';

type Props = {
  mode: ModeType,
};

export const Mode: React.FC<Props> = ({ mode }) => {
  const {isLight} = useContext(ThemeContext);
  const [modeType, setMode] = useLocaleStorage<string | null>('mode', null);

  const [isGame, setIsGame] = useSessionStorage<boolean>('isGame', false);
  const [isQuestion, setIsQuestion] = useSessionStorage<boolean>('isQuestion', true);
  const [questionIndex, setQuestionIndex] = useSessionStorage<number>('questionIndex', 0); 
  const [dareIndex, setDareIndex] = useSessionStorage<number>('dareIndex', 0);
  const [isChoosed, setIsChoosed] = useSessionStorage<boolean>('isActionChoosed', false);

  const onDataClear = () => {
    setIsGame(false);
    setIsQuestion(true);
    setQuestionIndex(0);
    setDareIndex(0);
    setIsChoosed(false);
  }
 
  const onModeSelect = (modeType: string | null) => {
    setMode(modeType);
    onDataClear();
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
        <i className={`bx bx-${mode.imgType}`}/>
        <h1>{mode.title}</h1>
      </div>

      <ModeDescription mode={mode} isLight={isLight}/>
    </div>
  )
}
