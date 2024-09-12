import axios from 'axios';

export const getRestaurant = async (req, res) => {
    const { lat, lng, distance, restaurantType } = req.body;
    const radius = distance * 1609.34; // Convert miles to meters since Google Places API is used in meters

    try {
        const response = await axios.post(
            'https://places.googleapis.com/v1/places:searchNearby',
          {
            includedTypes: [restaurantType],
            maxResultCount: 20,
            rankPreference: "POPULARITY",
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
              'X-Goog-Api-Key': process.env.API_KEY,
              'X-Goog-FieldMask': 'places.displayName.text,places.rating,places.priceLevel,places.formattedAddress,places.websiteUri'
            }
          }
        );
        res.json(response.data)
    } catch (error) {
        res.status(500).json({
            error: error.response ? error.response.data : error.message,
        });
    }
};