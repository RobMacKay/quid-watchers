import React from 'react';

import './footer.styles.scss';

const Footer = () => {
  return (
    <footer>
      <p>
        Mael Landrin <br /> MonkeyFeeder <br /> Because I fed monkeys once
      </p>
      <p className="job">
        I'm looking for a job as a front-end developer in the Manchester and
        London areas, or remotely, so here's my{' '}
        <a
          href="https://monkeyfeeder.github.io/mael-landrin/"
          target="_blank"
          rel="noopener noreferrer"
        >
          portfolio
        </a>
      </p>
    </footer>
  );
};

export default Footer;
