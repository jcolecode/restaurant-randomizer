import React from 'react';

const Distance = ({ distanceValue }) => {
  return (
    <div className="card mx-auto p-4 form-group">
      <h5 className='fw-bolder'><label htmlFor="distance">Distance (in miles):</label></h5>
      <select className="form-control" id="distance" onChange={(e) => distanceValue(e.target.value)}>
        <option value="1">1 Mile</option>
        <option value="5">5 Miles</option>
        <option value="10">10 Miles</option>
        <option value="20">20 Miles</option>
      </select>
    </div>
  );
};

export default Distance;
