import React from 'react';

import './home-page.styles.scss';

import HomeContent from '../../components/home-content/home-content.component';
import Tutorial from '../../components/tutorial/tutorial.component';

const HomePage = () => {
  const hasAlreadyTutoed = true;

  return(
    <div className="home-page">
      {
        hasAlreadyTutoed ? 
        <HomeContent />
        : 
        <Tutorial />
      }
    </div>
  )
}

export default HomePage;