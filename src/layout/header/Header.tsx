import React from 'react';
import { NavLink } from 'react-router-dom';
import './Header.scss';

const Header: React.FC = () => {
  return (
    <header>
      <img src="" alt="logo" />
      <div className="header-links">
        <NavLink to={'/'}>JWT Decoded</NavLink>
        <NavLink to={'/history'}>History</NavLink>
        <NavLink to={'/jwt'}>What are JWTs?</NavLink>
      </div>
    </header>
  );
};

export default Header;
