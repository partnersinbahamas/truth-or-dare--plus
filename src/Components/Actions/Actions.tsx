import React, { useContext, useEffect, useState } from "react";
import classNames from "classnames";
import './Actions.scss';

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { LangContext } from "../../Providers/Language/LangProvider";

import { action } from "../../Types/Mode";
import { ModeType } from "../../Types/Mode";

import { getAllActions } from "../Helpers/Helpers";

import Empty from '../Empty/EmptyIndex';
import ActionsTools from "../ActionsTools/ActionToolsIndex";

type Props = {
  mode: ModeType | null,
}

export const Actions: React.FC<Props> = ({ mode }) => {
  const { isLight } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const [allActions, setAllActions] = useState<action[]>([]);

  const sortActions = () => {
    setAllActions((current: action[]) => [...current].sort((() => Math.random() - 0.5)));
  };
    
  useEffect(() => {
    if (mode) {
      getAllActions(setAllActions, mode, lang);
    }
  }, [mode, lang]);

  return (
    <div className="questions">
      <ul 
        className={classNames(
          'questions__list',
          'dark__container',
          {'light__container': isLight}
        )}
      >
        {!mode ? (
          <Empty place='questions' />
        ) : (
          <>
            {allActions.map((item) => (
              <li
                key={item.id}
              >
                <span>{item.action}</span>
              </li>
            ))}
          </>
        )}
        <span className="questions__average">{allActions.length}</span>
      </ul>
      <ActionsTools sortActions={sortActions} />
    </div>
  )
}
