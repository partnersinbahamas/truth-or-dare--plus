import React, { useContext, useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Nav } from "../../Types/Nav";
import classNames from "classnames";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { getTranslation } from "../../Transtalion";
import { LangContext } from "../../Providers/Language/LangProvider";
import './PageNavLink.scss';

type Props = {
  nav: Nav,
  setIsMove: (value: boolean) => void,
  setMove: boolean
}

export const PageNavLink: React.FC<Props> = ({nav, setIsMove, setMove}) => {
  const {to, text, img} = nav;
  const {isLight} = useContext(ThemeContext);
  const {lang} = useContext(LangContext);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/game') {
      setIsMove(false);
    } else {
      setIsMove(true);
    }

  }, [location.pathname]);


  return (
    <NavLink
      to={{
        pathname: `/${to}`,
        search: location.search,
      }}
      className={({isActive}) => classNames(
        'navLink__wrapper',
        'dark--nav-pageItem',
        {'light--nav-pageItem': isLight},
        {'light--nav-active': isActive && isLight},
        {'dark--nav-active': isActive && !isLight},
      )}
      >
      <i className={`bx ${img}`}></i>


      {/* <span>{getTranslation(`nav.${to}`, lang)}</span> */}
    </NavLink>
  )
}