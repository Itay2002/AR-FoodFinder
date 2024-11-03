import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FoodParser from '../data/FoodParser';

function CitySelector({ stateName }) {
  const [cities, setCities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FoodParser(); // Fetch all food data
        // Filter cities based on the state name
        const filteredCities = data
          .filter((item) => item.state === stateName)
          .map((item) => item.city);
        // Remove duplicates
        setCities([...new Set(filteredCities)]);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    if (stateName) {
      fetchData();
    }
  }, [stateName]);

  const handleCityChange = (event) => {
    const selectedCity = event.target.value;
    if (selectedCity) {
      navigate(`/City?city=${selectedCity}`); // Adjust the path as needed
    }
  };

  return (
    <select onChange={handleCityChange} disabled={!cities.length}>
      <option value="">Select a city</option>
      {cities.map((city, index) => (
        <option key={index} value={city}>
          {city}
        </option>
      ))}
    </select>
  );
}

export default CitySelector;
