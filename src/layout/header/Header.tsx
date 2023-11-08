import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import JWTImage from '../../assets/JWTIS.svg';
import Rownd from '../../assets/Rownd-white.svg';
import './Header.scss';
import classnames from 'classnames';
import Menu from '../../assets/menu.svg';
import Close from '../../assets/close.svg';

const Header: React.FC = () => {
  const { pathname } = useLocation();
  const [showMenu, setShowMenu] = useState(false);
  return (
    <>
      <header>
        <NavLink className="header-img" to={'/'}>
          <img src={JWTImage} alt="logo" />
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
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="header-menu-button"
        >
          <img src={showMenu ? Close : Menu} />
        </button>
      </header>
      {showMenu && (
        <div className="menu">
          <div className="menu-background" onClick={() => setShowMenu(false)} />
          <div className="menu__content">
            <button className="menu__content__item">JWT Debugger</button>
            <button className="menu__content__item">History</button>
            <button className="menu__content__item">What are JWTs?</button>
            <button className="menu__content__item">Community</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
