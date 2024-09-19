import React from 'react';

const PriceLevel = {
  PRICE_LEVEL_UNSPECIFIED: "Unspecified",
  PRICE_LEVEL_FREE: "Free",
  PRICE_LEVEL_INEXPENSIVE: "$ (Inexpensive)",
  PRICE_LEVEL_MODERATE: "$$ (Moderate)",
  PRICE_LEVEL_EXPENSIVE: "$$$ (Expensive)",
  PRICE_LEVEL_VERY_EXPENSIVE: "$$$$ (Very Expensive)"
};

const Restaurant = ({ randomRestaurant, allRestaurants, hasLoadedOnce }) => {

  if (!hasLoadedOnce) {
    return <div className='alert alert-warning mt-4 text-center fw-bolder'>Welcome! Please randomize to find a restaurant.</div>;
  }

  if (!randomRestaurant) {
    return <div className='alert alert-warning mt-4 text-center fw-bolder'>No restaurant found! Please adjust your search parameters.</div>;
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
              <p className='card-text'>Rating: {randomRestaurant.rating || 'N/A'}</p>
              <p className='card-text'>Price Level: {PriceLevel[randomRestaurant.priceLevel] || PriceLevel.PRICE_LEVEL_UNSPECIFIED}</p>
              <p className='card-text'>Location: {randomRestaurant.formattedAddress}</p>
              <div className='d-grid gap-2 col-8 mx-auto'>
                <a href={randomRestaurant.websiteUri} target="_blank" rel="noopener noreferrer" className='btn btn-danger border border-black m-1'>Website</a>
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
                  <p className='card-text'>Rating: {restaurant.rating || 'N/A'}</p>
                  <p className='card-text'>Price Level: {PriceLevel[restaurant.priceLevel] || PriceLevel.PRICE_LEVEL_UNSPECIFIED}</p>
                  <p className='card-text'>Location: {restaurant.formattedAddress}</p>
                  <div className='d-grid gap-2 col-8 mx-auto'>
                    <a href={restaurant.websiteUri} target="_blank" rel="noopener noreferrer" className='btn btn-danger border border-black m-1'>Website</a>
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