import React from 'react';
import { useParams, Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';

import './header.styles.scss';

const Header = () => {
  const {id} = useParams();

  return (
    <header>
      <Navbar expand="lg" variant="light" bg="light">
        <h1 className="site-title"><Link to={`/${id}`}>Quid <br /> <span>Watchers</span></Link></h1>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        {
          id !== undefined ?
          <Navbar.Collapse id="responsive-navbar-nav">
            <div className="items">
              <Link className="nav-link" to={`/${id}/add-new`}>Add monthly sheet</Link>
              <Link className="nav-link" to={`/${id}`}>Your monthly sheets</Link>
              <Link className="nav-link" to={`/${id}/resources`}>Resources</Link>
            </div>
          </Navbar.Collapse>
          : ''
        }
        
      </Navbar>
    </header>
  )
};

export default Header;