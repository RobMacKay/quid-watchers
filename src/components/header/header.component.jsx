import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';

import './header.styles.scss';
import { getUser } from '../../api/monthly-sheet.api';

const Header = () => {
  const { id } = useParams();
  const [currentUser, setCurrentUser] = useState({});

  const idIsTracker =
    id !== undefined &&
    id !== 'create-budget-tracker' &&
    id !== 'data' &&
    id !== 'contact';

  const fetchUser = async () => {
    if (idIsTracker) {
      const user = await getUser(id);

      setCurrentUser(user);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <header>
      <Navbar expand="lg" variant="light" bg="light">
        <h1 className="site-title">
          {idIsTracker ? (
            <Link to={`/${id}`}>
              Quid <br /> <span>Watchers</span>
            </Link>
          ) : (
            <Link to={`/`}>
              Quid <br /> <span>Watchers</span>
            </Link>
          )}
        </h1>
        <Navbar.Toggle
          aria-controls={`${idIsTracker ? 'responsive-navbar-nav' : ''}`}
        />
        {idIsTracker ? (
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="items">
              {currentUser.hasAlreadyTutoed ? (
                <>
                  <Link className="nav-link" to={`/${id}/add-new`}>
                    Add monthly sheet
                  </Link>
                  <Link className="nav-link" to={`/${id}`}>
                    Your monthly sheets
                  </Link>
                </>
              ) : (
                ''
              )}
              <Link className="nav-link" to={`/${id}/resources`}>
                Resources
              </Link>
              <Link className="nav-link" to={`/${id}/data`}>
                Your Data
              </Link>
            </div>
          </Navbar.Collapse>
        ) : (
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="items">
              <Link className="nav-link" to={`/data`}>
                Your Data
              </Link>
              <Link className="nav-link" to={`/contact`}>
                Contact
              </Link>
            </div>
          </Navbar.Collapse>
        )}
      </Navbar>
    </header>
  );
};

export default Header;
