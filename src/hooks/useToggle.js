const { useState } = require('react');

const useToggle = () => {
  const [value, setValue] = useState(false);

  const handleToggleValue = () => {
    setValue(!value);
  };

  return [value, handleToggleValue];
};

export default useToggle;
