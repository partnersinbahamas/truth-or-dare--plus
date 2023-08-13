import classNames from 'classnames';
import React, { useContext } from 'react';
import { ThemeContext } from '../../Providers/Theme/ThemeProvider';
import './Loader.scss';

export const Loader = () => {
  const { isLight } = useContext(ThemeContext);

  return (
    <div className="Loader" data-cy="loader">
      <div
        className={classNames(
          'Loader__content--small',
          'dark--loader',
          {'light--loader': isLight}
        )}
      />
    </div>
  )
};
