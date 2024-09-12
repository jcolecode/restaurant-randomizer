const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const axios = require("axios");

// Create an Express app
const app = express();
app.use(cors());
app.use(express.json());

// Define the API endpoint
app.post("/randomize", async (req, res) => {
  const {lat, lng, distance, restaurantType} = req.body;
  const radius = distance * 1609.34; // Convert miles to meters

  try {
    const response = await axios.post(
        "https://places.googleapis.com/v1/places:searchNearby",
        {
          includedTypes: [restaurantType],
          maxResultCount: 20,
          rankPreference: "POPULARITY",
          locationRestriction: {
            circle: {
              center: {
                latitude: lat,
                longitude: lng,
              },
              radius: radius,
            },
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-Goog-Api-Key": functions.config().google.api_key,
            "X-Goog-FieldMask": [
              "places.displayName.text",
              "places.rating",
              "places.priceLevel",
              "places.formattedAddress",
              "places.websiteUri",
            ].join(","),
          },
        },
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({
      error: error.response ? error.response.data : error.message,
    });
  }
});

// Export the Express app as a Firebase Function
module.exports = {
  api: functions.https.onRequest(app),
};
