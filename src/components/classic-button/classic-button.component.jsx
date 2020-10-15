import React from 'react';

import './classic-button.styles.scss';

const ClassicButton = ({ children, handleClick, ...otherProps }) => {
  return(
    <button className="classic-button" onClick={handleClick} {...otherProps}>
      {children}
    </button>
  )
};

export default ClassicButton;