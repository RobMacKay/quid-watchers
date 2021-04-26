import React from 'react';

import './footer.styles.scss';
import { Link, useParams } from 'react-router-dom';

const Footer = () => {
  const { id } = useParams();

  return (
    <footer>
      <p>
        Mael Landrin <br /> MonkeyFeeder <br /> Because I fed monkeys once
      </p>
    </footer>
  );
};

export default Footer;
