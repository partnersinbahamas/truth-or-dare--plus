import classNames from "classnames";
import React, { useContext } from "react";
import PageNavLink from "../PageNavLink/PageNavLinkIndex";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { navigations } from "../Helpers/Variables";
import  NavigationItem from "../NavigationItem/NavigationItemIndex";
import './Navigations.scss';

// const navigations = [
//   {id: 1, text: 'Home', img: 'bxs-home', to: 'home'},
//   {id: 2, text: 'Settings', img: 'bxs-cog', to: 'settings'},
//   {id: 3, text: 'Game', img: 'bxs-game', to: 'game'},
//   {id: 4, text: 'Squads', img: 'bxs-castle', to: 'squads'},
// ];

export const Navigation = ({setIsMove}) => {
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