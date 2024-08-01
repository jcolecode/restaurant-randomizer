import React, { useState } from 'react';
import axios from 'axios';
import DistanceSelector from './components/Distance';
import RestaurantDisplay from './components/Restaurant';

function App() {
  const [distance, setDistance] = useState(1);
  const [restaurantName, setRestaurantName] = useState(null);

  const handleDistanceChange = (selectedDistance) => {
    setDistance(selectedDistance);
  };

  const handleRandomize = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude + (Math.random() - 0.5) * 0.01;
        const lng = position.coords.longitude + (Math.random() - 0.5) * 0.01;
        const radius = distance * 1609.34; // Convert miles to meters

        axios.post(
          'https://places.googleapis.com/v1/places:searchNearby',
          {
            includedTypes: ['restaurant'],
            maxResultCount: 20,
            locationRestriction: {
              circle: {
                center: {
                  latitude: lat,
                  longitude: lng
                },
                radius: radius
              }
            }
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-Goog-Api-Key': 'process.env.API_KEY',
              'X-Goog-FieldMask': 'places.displayName.text'
            }
          }
        )
        .then((response) => {
          console.log('API Response:', response.data);
          if (response.data.places && response.data.places.length > 0) {
            const randomIndex = Math.floor(Math.random() * response.data.places.length);
            const restaurant = response.data.places[randomIndex];
            setRestaurantName(restaurant.displayName.text);
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
    <div className="container">
      <h1 className="my-4 text-center fw-bolder">Restaurant Randomizer</h1>
      <h3 className='text-center fw-normal pb-4'>Don't know what to eat? Randomize now!</h3>
      <DistanceSelector distanceValue={handleDistanceChange} />
      <button className="btn btn-danger mt-3" onClick={handleRandomize}>Randomize</button>
      <RestaurantDisplay restaurantName={restaurantName} />
    </div>
  );
}

export default App;
