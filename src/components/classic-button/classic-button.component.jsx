import React from 'react';

import './classic-button.styles.scss';

const ClassicButton = ({ children, handleClick, addClass, ...otherProps }) => {
  return(
    <button className={`classic-button ${addClass ? addClass : ''}`} onClick={handleClick} {...otherProps}>
      {children}
    </button>
  )
};

export default ClassicButton;