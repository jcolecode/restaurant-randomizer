import React from 'react';

const Restaurant = ({ restaurantName }) => {
  if (!restaurantName) {
    return <div className='mx-auto alert alert-warning' role='alert'>No restaurant found, please try again!</div>;
  }

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">{restaurantName}</h5>
      </div>
    </div>
  );
};

export default Restaurant;