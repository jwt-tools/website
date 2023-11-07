import React from 'react';
import Rownd from '../../assets/Rownd-white.svg';
import './Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer__title">JWT.IS is brought to you by</div>
      <img src={Rownd} alt="Rownd" />
      <div className="footer__subtitle">
        Securely implement frictionless authentication with JWTs using Rownd on
        any stack and any device in less than 10 minutes.
      </div>
    </div>
  );
};

export default Footer;
