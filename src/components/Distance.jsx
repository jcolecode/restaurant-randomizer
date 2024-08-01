import React from 'react';

const DistanceSelector = ({ onDistanceChange }) => {
  return (
    <div className="form-group">
      <label htmlFor="distance">Select Distance (in miles):</label>
      <select className="form-control" id="distance" onChange={(e) => onDistanceChange(e.target.value)}>
        <option value="1">1 Mile</option>
        <option value="5">5 Miles</option>
        <option value="10">10 Miles</option>
        <option value="20">20 Miles</option>
      </select>
    </div>
  );
};

export default DistanceSelector;
