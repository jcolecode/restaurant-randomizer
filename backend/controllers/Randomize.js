import axios from 'axios';

export const getRestaurant = async (req, res) => {
    const { lat, lng, distance } = req.body;
    const radius = distance * 1609.34; // Convert miles to meters since Google Places API is used in meters

    try {
        const response = await axios.post(
            'https://places.googleapis.com/v1/places:searchNearby',
          {
            includedTypes: ['restaurant'],
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
              'X-Goog-FieldMask': 'places.displayName.text'
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