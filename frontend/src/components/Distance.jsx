import React from 'react';

const Distance = ({ distanceValue, restaurantType }) => {
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
        <option value="4">4 Miles</option>
        <option value="5">5 Miles</option>
        <option value="10">10 Miles</option>
        <option value="20">20 Miles</option>
      </select>

      <h5 className='fw-bolder mt-4'><label htmlFor="restaurant-type">Restaurant Type:</label></h5>
      <select className="form-control" id="restaurant-type" onChange={(e) => restaurantType(e.target.value)}>
        <option value="restaurant">Best Restaurants</option>
        <option value="american_restaurant">American</option>
        <option value="bakery">Bakery</option>
        <option value="bar">Bar</option>
        <option value="barbecue_restaurant">Barbecue</option>
        <option value="brazilian_restaurant">Brazilian</option>
        <option value="breakfast_restaurant">Breakfast</option>
        <option value="brunch_restaurant">Brunch</option>
        <option value="cafe">Cafe</option>
        <option value="chinese_restaurant">Chinese</option>
        <option value="coffee_shop">Coffee Shop</option>
        <option value="fast_food_restaurant">Fast Food</option>
        <option value="french_restaurant">French</option>
        <option value="greek_restaurant">Greek</option>
        <option value="hamburger_restaurant">Hamburger</option>
        <option value="ice_cream_shop">Ice Cream</option>
        <option value="indian_restaurant">Indian</option>
        <option value="indonesian_restaurant">Indonesian</option>
        <option value="italian_restaurant">Italian</option>
        <option value="japanese_restaurant">Japanese</option>
        <option value="korean_restaurant">Korean</option>
        <option value="lebanese_restaurant">Lebanese</option>
        <option value="mediterranean_restaurant">Mediterranean</option>
        <option value="mexican_restaurant">Mexican</option>
        <option value="middle_eastern_restaurant">Middle Eastern</option>
        <option value="pizza_restaurant">Pizza</option>
        <option value="ramen_restaurant">Ramen</option>
        <option value="sandwich_shop">Sandwich Shop</option>
        <option value="seafood_restaurant">Seafood</option>
        <option value="spanish_restaurant">Spanish</option>
        <option value="steak_house">Steak House</option>
        <option value="sushi_restaurant">Sushi</option>
        <option value="thai_restaurant">Thai</option>
        <option value="turkish_restaurant">Turkish</option>
        <option value="vegan_restaurant">Vegan</option>
        <option value="vegetarian_restaurant">Vegetarian</option>
        <option value="vietnamese_restaurant">Vietnamese</option>
      </select>
    </div>
  );
};

export default Distance;
