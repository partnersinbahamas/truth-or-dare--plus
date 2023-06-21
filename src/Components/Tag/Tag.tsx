import React, { useContext } from "react"
import './Tag.scss';
import { Link } from "react-router-dom"
import classNames from "classnames"
import { ThemeContext } from "../../Providers/Theme/ThemeProvider";

type Props = {
    isMove: boolean
};

export const Tag: React.FC<Props> = ({isMove}) => {
  const {isLight} = useContext(ThemeContext);

  return (
    <Link 
      to='https://www.instagram.com/partnersinbahamas/'
      className={classNames("tag", 'dark--tag', {"tag tag--move" : isMove}, {'light--tag': isLight})}
      target='_blank'
    >
      DB
    </Link>
  )
}
