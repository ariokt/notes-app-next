const { useState } = require('react');

const useInput = () => {
  const [value, setValue] = useState('');

  const handleChangeValue = (e) => {
    setValue(e.target.value);
  };

  return [value, handleChangeValue];
};

export default useInput;
