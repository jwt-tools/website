import React from 'react';
import Rownd from '../../assets/Rownd-white.svg';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__title">JWT.IS is brought to you by</div>
      <NavLink target="_blank" to="https://rownd.io/">
        <img src={Rownd} alt="Rownd" />
      </NavLink>
      <div className="footer__subtitle">
        Securely implement frictionless authentication with JWTs using Rownd on
        any stack and any device in less than 10 minutes.
      </div>
      <button>Get started for free</button>
    </div>
  );
};

export default Footer;
