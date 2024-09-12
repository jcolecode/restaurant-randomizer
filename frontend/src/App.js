import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate } from 'react-router-dom';
import DistanceSelector from './components/Distance';
import RestaurantDisplay from './components/Restaurant';
import Header from './components/Header';
import EnableLocation from './components/EnableLocation';

function App() {
  const [distance, setDistance] = useState(0.1);
  const [restaurantType, setRestaurantType] = useState('restaurant');
  const [randomRestaurant, setRandomRestaurant] = useState(null);
  const [allRestaurants, setAllRestaurants] = useState([]);
  const [isRandomized, setIsRandomized] = useState(false);
  const [loading, setLoading] = useState(false);
  const [redirectToLocationPage, setRedirectToLocationPage] = useState(false);

  const handleDistanceChange = (selectedDistance) => {
    setDistance(selectedDistance);
  };

  const handleRestaurantTypeChange = (selectedRestaurant) => {
    setRestaurantType(selectedRestaurant);
  }

  const handleRandomize = () => {
    if (navigator.geolocation) {
      setLoading(true); // Start loading
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          randomizeRestaurant(lat, lng);
        },
        (error) => {
          setLoading(false); // Stop loading on error
          if (error.code === error.PERMISSION_DENIED) {
            setRedirectToLocationPage(true); // Redirect to enable location page
          } else {
            alert('Error obtaining location.');
          }
        },
        {
          timeout: 10000, // Optional: Set a timeout to wait for location
        }
      );
    } else {
      setRedirectToLocationPage(true); // Redirect to enable location page if geolocation is not supported
    }
  };

  const randomizeRestaurant = (lat, lng) => {
    axios.post(
      'https://us-central1-restaurant-randomizer-827a3.cloudfunctions.net/api/randomize', { lat, lng, distance, restaurantType })
    .then((response) => {
      console.log('API Response:', response.data.places);
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
      setLoading(false);
    })
    .catch((error) => {
      console.error('Error fetching data:', error.response ? error.response.data : error.message);
      setLoading(false);
    });
  };

  useEffect(() => {
    // Reset redirect state on mount
    setRedirectToLocationPage(false);
  }, []);

  return (
    <Routes>
      <Route path="/enable-location" element={<EnableLocation />} />
      <Route
        path="/"
        element={
          redirectToLocationPage ? (
            <Navigate to="/enable-location" replace />
          ) : (
            <div>
              <div id='stars'></div>
              <div className="container">
                <Header />
                <DistanceSelector 
                  distanceValue={handleDistanceChange} 
                  restaurantType={handleRestaurantTypeChange}
                />
                <div className='text-center'>
                  <button className="btn btn-dark mt-4" onClick={handleRandomize}>
                    Randomize
                  </button>
                </div>
                {loading ? (
                  <div className="text-center mt-4">
                    <div className="spinner-border" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <RestaurantDisplay
                    randomRestaurant={randomRestaurant}
                    isRandomized={isRandomized}
                    allRestaurants={allRestaurants}
                  />
                )}
              </div>
            </div>
          )
        }
      />
    </Routes>
  );
}

export default App;
