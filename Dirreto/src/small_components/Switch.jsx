import React, { useState } from "react";
import "./Switch.css"; // Import the CSS file for styling

const Switch = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleToggle = () => {
    setIsChecked(!isChecked);
  };

  return (
    <label className="switch">
      <input type="checkbox" checked={isChecked} onChange={handleToggle} />
      <span className="slider"></span>
    </label>
  );
};

export default Switch;
