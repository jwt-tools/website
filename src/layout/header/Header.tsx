import React, { useCallback, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import JWTImage from '../../assets/JWTIS.svg';
import Rownd from '../../assets/Rownd-white.svg';
import './Header.scss';
import classnames from 'classnames';
import Menu from '../../assets/menu.svg';
import Close from '../../assets/close.svg';

const Header: React.FC = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeTab, setActiveTab] = useState('debugger');

  useEffect(() => {
    const handleScroll = () => {
      // Perform actions on scroll/resize
      let tab = 'debugger';

      const historyElem = document.querySelector('.history');
      const historyRect = historyElem?.getBoundingClientRect();
      if (historyRect?.top && historyRect?.top < 100) {
        tab = 'history';
      }

      const educationElem = document.querySelector('.title-education');
      const educationRect = educationElem?.getBoundingClientRect();
      if (educationRect?.top && educationRect?.top < 100) {
        tab = 'education';
      }

      setActiveTab(tab);
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const scrollToElement = useCallback((selector: string) => {
    const elem = document.querySelector(selector);
    const rect = elem?.getBoundingClientRect();
    const scrollY = window.scrollY;

    const height = (rect?.top || 0) - 50 + scrollY;
    window.scrollTo({
      top: height,
      behavior: 'smooth',
    });
  }, []);

  return (
    <>
      <header>
        <NavLink className="header-img" to={'/'}>
          <img src={JWTImage} alt="logo" />
        </NavLink>

        <div className="header-links">
          <button
            className={classnames('header-link', {
              'header-link-active': activeTab === 'debugger',
            })}
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: 'smooth',
              })
            }
          >
            JWT Debugger
          </button>
          <button
            onClick={() => scrollToElement('.history')}
            className={classnames('header-link', {
              'header-link-active': activeTab === 'history',
            })}
          >
            History
          </button>
          <button
            onClick={() => scrollToElement('.title-education')}
            className={classnames('header-link', {
              'header-link-active': activeTab === 'education',
            })}
          >
            What are JWTs?
          </button>
        </div>
        <NavLink
          className="header-built-by"
          target="_blank"
          to={'https://rownd.io/'}
        >
          Built by <img src={Rownd} alt="Rownd" />
        </NavLink>
        <button
          onClick={() => setShowMenu((prev) => !prev)}
          className="header-menu-button"
        >
          <img src={showMenu ? Close : Menu} alt="icon" />
        </button>
      </header>
      {showMenu && (
        <div className="menu">
          <div className="menu-background" onClick={() => setShowMenu(false)} />
          <div className="menu__content">
            <button
              className="menu__content__item"
              onClick={() => {
                window.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                });
                setShowMenu(false);
              }}
            >
              JWT Debugger
            </button>
            <button
              className="menu__content__item"
              onClick={() => {
                scrollToElement('.history');
                setShowMenu(false);
              }}
            >
              History
            </button>
            <button
              onClick={() => {
                scrollToElement('.title-education');
                setShowMenu(false);
              }}
              className="menu__content__item"
            >
              What are JWTs?
            </button>
            <button
              onClick={() => {
                scrollToElement('.community');
                setShowMenu(false);
              }}
              className="menu__content__item"
            >
              Community
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
