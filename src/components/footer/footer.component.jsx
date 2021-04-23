import React from 'react';

import './footer.styles.scss';
import { Link, useParams } from 'react-router-dom';

const Footer = () => {
  let { id } = useParams();

  return (
    <footer>
      <p>
        Mael Landrin <br /> MonkeyFeeder <br /> Because I fed monkeys once
      </p>
      <p className="job">
        <Link to={'/:id/data'}>Your Data</Link>
      </p>
    </footer>
  );
};

export default Footer;
