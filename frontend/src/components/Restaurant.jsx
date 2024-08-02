import React from 'react';

const Restaurant = ({ restaurantName, isRandomized }) => {

  if (!restaurantName) {
    if (!isRandomized) {
      return <div className='alert alert-warning mt-4'>Welcome! Please randomize to find a restaurant.</div>;
    }
    else {
      return <div className='alert alert-warning mt-4'>No restaurant found! Please adjust your search parameters.</div>;
    }
  }

  return (
    <div className="card m-4">
      <div className="card-body">
        <h5 className="card-title text-center fw-bolder">{restaurantName}</h5>
        <p className='card-text'>Kind of food</p>
        <p className='card-text'>Reviews</p>
        <p className='card-text'>Price</p>
        <p className='card-text'>Location</p>
        <a href='#' className='btn btn-secondary border border-black m-1'>Directions</a>
        <a href='#' className='btn btn-danger border border-black m-1'>Website</a>
      </div>
    </div>
  );
};

export default Restaurant;