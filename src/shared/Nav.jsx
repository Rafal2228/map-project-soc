// @flow
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './Nav.scss';

export function Nav() {
  return (
    <div className="nav">
      <Link className="nav__link" to="/">
        Home
      </Link>

      <Link className="nav__link" to="/settings">
        <FontAwesomeIcon icon={faCog} />
      </Link>
    </div>
  );
}
