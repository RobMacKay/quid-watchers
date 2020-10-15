import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import './header.styles.scss';

const Header = () => {
  return (
    <header>
      <Navbar expand="lg" variant="light" bg="light">
        <h1 className="site-title">Quid <br /> <span>Watchers</span></h1>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <div className="items">
            <Nav.Link href="#">Calendar</Nav.Link>
            <Nav.Link href="#">Resources</Nav.Link>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
};

export default Header;