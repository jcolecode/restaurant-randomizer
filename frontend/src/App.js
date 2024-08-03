import React, { useState } from 'react';
import axios from 'axios';
import DistanceSelector from './components/Distance';
import RestaurantDisplay from './components/Restaurant';
import Header from './components/Header';

function App() {
  const [distance, setDistance] = useState(0.1);
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [allRestaurants, setAllRestaurants] = useState([]);
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
            setRandomRestaurant(restaurant);
            setAllRestaurants(response.data.places);
            if (response.data.places.length > 0) {
              setIsRandomized(true);
            } else {
              setIsRandomized(false);
            }
          } else {
            setRandomRestaurant(null);
            setAllRestaurants(null);
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
    <div className='container'>
      <div id='stars'></div>
        <Header />
        <DistanceSelector distanceValue={handleDistanceChange} />
        <div className='text-center'>
          <button className="btn btn-dark mt-4" onClick={handleRandomize}>Randomize</button>
        </div>
        <RestaurantDisplay randomRestaurant={randomRestaurant} isRandomized={isRandomized} allRestaurants={allRestaurants}/>
    </div>
  );
}

export default App;
