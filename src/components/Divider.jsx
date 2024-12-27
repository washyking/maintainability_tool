import React from 'react';
import './styles/Divider.css'; // Import your CSS file for styling

const Divider = ({ title }) => {
  return (
    <div className="divider">
      <h2>{title}</h2>
    </div>
  );
};

export default Divider;
