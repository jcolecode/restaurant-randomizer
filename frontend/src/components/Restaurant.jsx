import React from 'react';

const Restaurant = ({ randomRestaurant, allRestaurants, isRandomized }) => {

  if (!randomRestaurant) {
    if (!isRandomized) {
      return <div className='alert alert-warning mt-4 text-center fw-bolder'>Welcome! Please randomize to find a restaurant.</div>;
    }
    else {
      return <div className='alert alert-warning mt-4 text-center fw-bolder'>No restaurant found! Please adjust your search parameters.</div>;
    }
  }

  const filteredRestaurants = allRestaurants.filter(restaurant => 
    restaurant.displayName !== randomRestaurant.displayName
  );

  return (
    <div className='container'>

      <div className='row'>
        <div className='mt-4'>
          <div className="card mx-auto" id='mainCard'>
            <div className="card-body">
              <h5 className="card-title text-center fw-bolder">{randomRestaurant.displayName.text}</h5>
              <p className='card-text'>Kind of food</p>
              <p className='card-text'>Reviews</p>
              <p className='card-text'>Price</p>
              <p className='card-text'>Location</p>
              <div className='d-grid gap-2 col-8 mx-auto'>
                <a href='#' className='btn btn-secondary border border-black m-1'>Directions</a>
                <a href='#' className='btn btn-danger border border-black m-1'>Website</a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h3 className='mt-5 fw-bolder text-center'>Other Restaurants</h3>
        <div className="row">
          {filteredRestaurants.map((restaurant, index) => (
            <div key={index} className="mb-4">
              <div className="card mx-auto" id='otherCards'>
                <div className="card-body">
                  <h5 className="card-title text-center fw-bolder">{restaurant.displayName.text}</h5>
                  <p className='card-text'>Kind of food</p>
                  <p className='card-text'>Reviews</p>
                  <p className='card-text'>Price</p>
                  <p className='card-text'>Location</p>
                  <div className='d-grid gap-2 col-8 mx-auto'>
                    <a href='#' className='btn btn-secondary border border-black m-1'>Directions</a>
                    <a href='#' className='btn btn-danger border border-black m-1'>Website</a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Restaurant;