import React, { useState } from "react";

import { Link, useLocation } from "react-router-dom";

import "./header.scss";

const Header = () => {
  const [activeHeader, setActiveHeader] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className={`header ${activeHeader ? "header--active" : ""}`}>
      <Link to="/">
        <div className="header__logo">
          <div className="header__logo-icon">
            <svg
              width="60"
              height="44"
              viewBox="0 0 60 44"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M55.8621 0H4.13793C1.86207 0 0 1.84186 0 4.09302V37.3488C0 38.2186 0.672414 38.8837 1.55172 38.8837C2.43103 38.8837 3.10345 38.2186 3.10345 37.3488V33.7674H7.75862V40.9302H6.72414C5.84483 40.9302 5.17241 41.5953 5.17241 42.4651C5.17241 43.3349 5.84483 44 6.72414 44H55.8621C58.1379 44 60 42.1581 60 39.907V4.09302C60 1.84186 58.1379 0 55.8621 0ZM3.10345 13.3023H7.75862V20.4651H3.10345V13.3023ZM52.2414 13.3023H56.8965V20.4651H52.2414V13.3023ZM52.2414 23.5349H56.8965V30.6977H52.2414V23.5349ZM56.8965 4.09302V10.2326H52.2414V3.06977H55.8621C56.431 3.06977 56.8965 3.53023 56.8965 4.09302ZM4.13793 3.06977H7.75862V10.2326H3.10345V4.09302C3.10345 3.53023 3.56897 3.06977 4.13793 3.06977ZM3.10345 30.6977V23.5349H7.75862V30.6977H3.10345ZM55.8621 40.9302H52.2414V33.7674H56.8965V39.907C56.8965 40.4698 56.431 40.9302 55.8621 40.9302Z"
                fill="#444B54"
              />
              <path
                d="M26.5345 16.0139L34.7069 20.6697C35.7414 21.2837 35.7414 22.7163 34.7069 23.3302L26.5345 27.986C25.5 28.6 24.2069 27.8325 24.2069 26.6558V17.3442C24.2069 16.1674 25.5 15.4 26.5345 16.0139Z"
                fill="#FF5576"
              />
            </svg>
          </div>
          <p className="header__logo-title">React movies</p>
        </div>
      </Link>

      <nav className="nav">
        <ul className="nav__list">
          <li
            className={`nav__list-item ${
              pathname === "/movie" ? "nav__list-item--active" : ""
            }`}
          >
            <Link to="/movie">Фильмы</Link>
          </li>
          <li
            className={`nav__list-item ${
              pathname === "/tv" ? "nav__list-item--active" : ""
            }`}
          >
            <Link to="/tv">Сериалы</Link>
          </li>
        </ul>
      </nav>

      <button
        className={`header__button ${
          activeHeader ? "header__button--active" : ""
        }`}
        onClick={() => setActiveHeader(!activeHeader)}
      >
        <span></span>
      </button>
    </header>
  );
};

export default Header;
