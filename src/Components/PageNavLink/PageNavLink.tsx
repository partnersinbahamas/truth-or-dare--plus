import React, { useContext, useEffect} from "react";
import { NavLink, useLocation } from "react-router-dom";

import { Nav } from "../../Types/Nav";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

import classNames from "classnames";
import './PageNavLink.scss';

type Props = {
  nav: Nav,
  setIsMove: (value: boolean) => void,
}

export const PageNavLink: React.FC<Props> = ({ nav, setIsMove }) => {
  const {to, img} = nav;
  const {isLight} = useContext(ThemeContext);
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
    </NavLink>
  )
}
