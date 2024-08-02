import React, { useState } from 'react';
import axios from 'axios';
import DistanceSelector from './components/Distance';
import RestaurantDisplay from './components/Restaurant';

function App() {
  const [distance, setDistance] = useState(0.1);
  const [restaurantName, setRestaurantName] = useState(null);
  const [isRandomized, setIsRandomized] = useState(false);

  const handleDistanceChange = (selectedDistance) => {
    setDistance(selectedDistance);
  };

  const handleRandomize = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        axios.post(
          'http://localhost:5050/randomize', { lat, lng, distance })
        .then((response) => {
          console.log('API Response:', response.data);
          if (response.data.places && response.data.places.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.data.places.length);
            const restaurant = response.data.places[randomIndex];
            setRestaurantName(restaurant.displayName.text);
            if (response.data.places.length > 0) {
              setIsRandomized(true);
            } else {
              setIsRandomized(false);
            }
          } else {
            setRestaurantName(null);
          }
        })
        .catch((error) => {
          console.error('Error fetching data:', error.response ? error.response.data : error.message);
        });
      }, (error) => {
        console.error('Error getting location:', error);
      });
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
    <div>
      <div id='stars'></div>
        <div className="container">
          <h1 className="my-4 text-center fw-bolder">Restaurant Randomizer</h1>
          <h3 className='text-center fw-normal pb-4'>Don't know what to eat? Randomize now!</h3>
          <DistanceSelector distanceValue={handleDistanceChange} />
          <button className="btn btn-dark mt-4" onClick={handleRandomize}>Randomize</button>
          <RestaurantDisplay restaurantName={restaurantName} isRandomized={isRandomized}/>
        </div>
    </div>
  );
}

export default App;
