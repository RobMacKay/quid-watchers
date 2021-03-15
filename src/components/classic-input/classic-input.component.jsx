import React from 'react';

import './classic-input.styles.scss';

const ClassicInput = ({ handleChange, placeholder, color, ...otherProps }) => {
  return (
    <div className="classic-input">
      <input
        onChange={handleChange}
        {...otherProps}
        placeholder={placeholder ? placeholder : null}
      />
    </div>
  );
};

export default ClassicInput;
