import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import JWTImage from '../../assets/JWTIS.svg';
import Rownd from '../../assets/Rownd-white.svg';
import './Header.scss';
import classnames from 'classnames';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <header>
      <NavLink to={'/'}>
        <img className="header-img" src={JWTImage} alt="logo" />
      </NavLink>

      <div className="header-links">
        <NavLink
          className={classnames('header-link', {
            'header-link-active': pathname === '/',
          })}
          to={'/'}
        >
          JWT Debugger
        </NavLink>
        <NavLink className={'header-link'} to={'/history'}>
          History
        </NavLink>
        <NavLink className={'header-link'} to={'/jwt'}>
          What are JWTs?
        </NavLink>
      </div>
      <NavLink target="_blank" to={'https://rownd.io/'}>
        <div className="header-built-by">
          Built by <img src={Rownd} alt="Rownd" />
        </div>
      </NavLink>
    </header>
  );
};

export default Header;
