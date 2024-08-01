import React from 'react';

const RestaurantDisplay = ({ restaurantName }) => {
  if (!restaurantName) {
    return <div>No restaurant found.</div>;
  }

  return (
    <div className="card mt-4">
      <div className="card-body">
        <h5 className="card-title">{restaurantName}</h5>
      </div>
    </div>
  );
};

export default RestaurantDisplay;
