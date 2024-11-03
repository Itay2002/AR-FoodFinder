import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackToHomepage from '../components/BackToHomepage';
import FoodParser from '../data/FoodParser';
import FoodSelector from '../components/FoodSelector';

const City = () => {
  const [foodData, setFoodData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Function to get the city name from query parameters
  const getCityName = () => {
    const params = new URLSearchParams(location.search);
    return params.get('city');
  };

  const cityName = getCityName(); // Extract the city name from the URL

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await FoodParser(); // Parse data for all restaurants
        const filteredData = data.filter(restaurant => restaurant.city === cityName); // Filter by city
        setFoodData(filteredData); // Store the filtered data in state
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, [cityName]); // Re-run effect if cityName changes

  // Navigate to Food page with selected restaurant
  const handleFoodSelect = (restaurantName) => {
    if (restaurantName) {
      navigate(`/Food?restaurant=${restaurantName}`); // Redirect to Food page with restaurant name in query
    }
  };

  return (
    <div>
      <BackToHomepage />
      <h1>Restaurants in {cityName}</h1>
      
      {/* Dropdown of all restaurants */}
      <FoodSelector foodData={foodData} onFoodSelect={handleFoodSelect} />
    </div>
  );
};

export default City;
