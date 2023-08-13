import React, { useContext } from "react";

import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { navigations } from "../Helpers/Variables";
import  NavigationItem from "../NavigationItem/NavigationItemIndex";

import classNames from "classnames";
import './Navigations.scss';

type Props = {
  setIsMove: (value: boolean) => void,
}

export const Navigation: React.FC<Props> = ({ setIsMove }) => {
  const {isLight} = useContext(ThemeContext);

  return (
    <section className="nav">
      <ul 
        className={classNames(
          'nav__list',
          'dark--nav-list',
          {'light--nav-list': isLight},
        )}
      >
        {navigations.map((nav) => (
          <NavigationItem key={nav.id} nav={nav} setIsMove={setIsMove}/>
        ))}
      </ul>
    </section>
  )
}
