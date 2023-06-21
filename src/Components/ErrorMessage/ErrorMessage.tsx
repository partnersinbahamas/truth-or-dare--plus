import React from "react";
import classNames from "classnames";
import './ErrorMessage.scss';

type Props = {
  message: string,
  isBig?: boolean
}

export const ErrorMessage: React.FC<Props> = ({ message, isBig }) => {
  return (
    <p
      className={classNames(
        'errorMessage',
        {'errorMessage__big': isBig}
      )}
    >
      {message}
    </p>
  )
} 
