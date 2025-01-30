import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";

const CityAndCountry = ({ lng, lat }) => {
  const [location, setLocation] = useState("Fetching location...");
  const [error, setError] = useState(null);

  const fetchCityAndCountry = async () => {
    const accessToken = "pk.eyJ1Ijoicm9sbiIsImEiOiJjbHUydnB1Y3EwYnFzMmlxZWc2NWFscDJvIn0.9TwHwnZcT6qB2OO6Q4OnFQ";
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${accessToken}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch location data");
      }

      const data = await response.json();
      const place = data.features.find((feature) => feature.place_type.includes("place"));
      const country = data.features.find((feature) => feature.place_type.includes("country"));

      const city = place ? place.text : "Unknown city";
      const countryName = country ? country.text : "Unknown country";

      setLocation(`${city}, ${countryName}`);
    } catch (error) {
      console.error("Error fetching location:", error.message);
      setError("Error fetching location");
    }
  };

  useEffect(() => {
    fetchCityAndCountry();
  }, [lng, lat]);


  return (
    <Text style={{ padding: "10px", color: error ? "red" : "black" }}>
      {error || location}
    </Text>
  );


};

export default CityAndCountry;
