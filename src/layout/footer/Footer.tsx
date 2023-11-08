import React from 'react';
import Rownd from '../../assets/Rownd-white.svg';
import LinkedIn from '../../assets/logo--linkedin.svg';
import './Footer.scss';
import { NavLink } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__title">JWT.IS brought to you by</div>
      <NavLink target="_blank" to="https://rownd.io/">
        <img className="footer__img__big" src={Rownd} alt="Rownd" />
      </NavLink>
      <div className="footer__subtitle">
        Securely implement frictionless authentication with JWTs on
        any stack and any device in less than 10 minutes.
      </div>
      <a target="_blank" href="https://rownd.io/" className="secondary-button">
        Get started for free
      </a>

      <div className="footer__bottom">
        <div className="footer__bottom__built">
          Built by{' '}
          <NavLink target="_blank" to="https://rownd.io/">
            <img src={Rownd} />
          </NavLink>
        </div>
        <div className="footer__bottom_right">
          <a target="_blank" className="link" href="https://docs.rownd.io">
            Rownd docs
          </a>
          <a
            href="https://www.linkedin.com/company/rownd/"
            className="footer__follow-us"
            target="_blank"
          >
            Follow us on <img src={LinkedIn} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
