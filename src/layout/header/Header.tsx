import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.scss';
import classnames from 'classnames';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <img src="" alt="logo" />
      <div className="header-links">
        <NavLink
          className={classnames('header-link', {
            'header-link-active': pathname === '/',
          })}
          to={'/'}
        >
          JWT Decoded
        </NavLink>
        <NavLink className={'header-link'} to={'/history'}>
          History
        </NavLink>
        <NavLink className={'header-link'} to={'/jwt'}>
          What are JWTs?
        </NavLink>
      </div>
      <div>Built by Rownd</div>
    </header>
  );
};

export default Header;
