import React from 'react';

const Distance = ({ distanceValue }) => {
  return (
    <div className="card p-4 form-group">
      <h5 className='fw-bolder'><label htmlFor="distance">Distance (in miles):</label></h5>
      <select className="form-control" id="distance" onChange={(e) => distanceValue(e.target.value)}>
        <option value="0.1">0.1 Mile</option>
        <option value="0.2">0.2 Mile</option>
        <option value="0.3">0.3 Mile</option>
        <option value="0.4">0.4 Mile</option>
        <option value="0.5">0.5 Mile</option>
        <option value="0.6">0.6 Mile</option>
        <option value="0.7">0.7 Mile</option>
        <option value="0.8">0.8 Mile</option>
        <option value="0.9">0.9 Mile</option>
        <option value="1">1 Mile</option>
        <option value="2">2 Miles</option>
        <option value="3">3 Miles</option>
        <option value="4">4 Mile</option>
        <option value="5">5 Miles</option>
        <option value="10">10 Miles</option>
        <option value="20">20 Miles</option>
      </select>
    </div>
  );
};

export default Distance;
