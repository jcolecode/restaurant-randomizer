import React, { useState } from 'react';
import axios from 'axios';
import DistanceSelector from './components/Distance';
import RestaurantDisplay from './components/Restaurant';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [distance, setDistance] = useState(1);
  const [restaurantName, setRestaurantName] = useState(null);

  const handleDistanceChange = (selectedDistance) => {
    setDistance(selectedDistance);
  };

  const handleRandomize = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        const radius = distance * 1609.34; // Convert miles to meters

        axios.post(
          'https://places.googleapis.com/v1/places:searchNearby?key=AIzaSyCVOD3c87b19G7O8ro87Dy5DUdS4G4kiiw',
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
      <h1 className="my-4">Restaurant Randomizer</h1>
      <DistanceSelector onDistanceChange={handleDistanceChange} />
      <button className="btn btn-danger mt-3" onClick={handleRandomize}>Find a Random Restaurant</button>
      <RestaurantDisplay restaurantName={restaurantName} />
    </div>
  );
}

export default App;
