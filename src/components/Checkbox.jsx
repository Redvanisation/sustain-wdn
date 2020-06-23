/* eslint-disable no-unused-expressions */
import React, { useRef } from 'react';
import PropTypes from 'prop-types';

const CheckBox = ({
  value, name, arr, setArr,
}) => {
  const subjectsRef = useRef(null);


  const handleClick = () => {
    if (subjectsRef.current.checked) {
      if (arr.includes(subjectsRef.current.value)) return;
      setArr(prev => [...prev, subjectsRef.current.value]);
    } else {
      setArr(arr.filter((elem) => elem !== subjectsRef.current.value));
    }
  };


  return (
  <label className="checkbox" onClick={handleClick}>
    <input type="checkbox" name={name} value={value} ref={subjectsRef} />
    &nbsp;{value}
  </label>
  );
};

CheckBox.defaultProps = {
  value: 'Value',
};

CheckBox.propTypes = {
  value: PropTypes.string,
  arr: PropTypes.instanceOf(Array).isRequired,
  setArr: PropTypes.instanceOf(Function).isRequired,
};

export default CheckBox;
