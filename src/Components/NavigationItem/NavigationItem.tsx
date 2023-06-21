import React, { useContext } from "react";
import PageNavLink from "../PageNavLink/PageNavLinkIndex";
import classNames from "classnames";
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";
import { Nav } from "../../Types/Nav";

type Props = {
  nav: Nav,
  setIsMove?: (value: boolean) => void,
}

export const NavigationItem: React.FC<Props> = ({nav, setIsMove}) => {
    const { isLight } = useContext(ThemeContext)
  return (
    <li
      key={nav.id}
      className={classNames(
        'nav__item',
        'dark--nav-item',
        {'light--nav-item': isLight},
      )}
    >
      <PageNavLink nav={nav} setIsMove={setIsMove}/>
    </li>
  )
}