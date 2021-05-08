import React from 'react';

import './classic-input.styles.scss';

const ClassicInput = ({
  type,
  handleChange,
  placeholder,
  color,
  data,
  name,
  id,
  ...otherProps
}) => {
  if (type === 'text') {
    return (
      <div className="classic-input">
        <input
          type={type}
          name={name}
          id={id}
          onChange={handleChange}
          placeholder={placeholder ? placeholder : null}
          {...otherProps}
        />
      </div>
    );
  } else if (type === 'select') {
    return (
      <div className="classic-input">
        <select
          name={name}
          id={id}
          onChange={handleChange}
          defaultValue={'select-category'}
        >
          <option value="select-category" disabled>
            Select Category
          </option>
          {data.map((category, index) => {
            return (
              <option value={category} key={index}>
                {category}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
};

export default ClassicInput;
