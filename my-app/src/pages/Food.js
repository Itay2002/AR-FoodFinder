import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import FoodParser from '../data/FoodParser';
import BackToHomepage from '../components/BackToHomepage';

function Food() {
  const [restaurantDetails, setRestaurantDetails] = useState(null);
  const location = useLocation();

  // Function to get query parameters for name, state, and city
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return {
      name: params.get('name'),
      state: params.get('state'),
      city: params.get('city')
    };
  };

  const { name, state, city } = getQueryParams();

  useEffect(() => {
    const fetchRestaurantData = async () => {
      if (name && state && city) {
        try {
          // Fetch Excel data
          const excelData = await FoodParser();
          
          // Find the matching restaurant in the Excel data
          const matchedRestaurant = excelData.find(
            restaurant => 
              restaurant.name.trim().toLowerCase() === name.trim().toLowerCase() && 
              restaurant.state.trim().toUpperCase() === state.trim().toUpperCase() && 
              restaurant.city.trim().toLowerCase() === city.trim().toLowerCase()
          );

          console.log('Matched Restaurant:', matchedRestaurant);
          setRestaurantDetails(matchedRestaurant);
        } catch (error) {
          console.error("Error fetching restaurant details:", error);
        }
      } else {
        console.warn('Missing query parameters:', { name, state, city });
      }
    };

    fetchRestaurantData();
  }, [name, state, city]);

  return (
    <div className="container mx-auto p-4">
      <BackToHomepage />
      {restaurantDetails ? (
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-4">{restaurantDetails.name}</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h2 className="text-xl font-semibold mb-2">Location Details</h2>
              <p><strong>City:</strong> {restaurantDetails.city}</p>
              <p><strong>State:</strong> {restaurantDetails.state}</p>
              <p><strong>Address:</strong> {restaurantDetails.address}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Restaurant Information</h2>
              <p><strong>Category:</strong> {restaurantDetails.category}</p>
              <p><strong>Price Range:</strong> {restaurantDetails.price}</p>
            </div>
            
            <div>
              <h2 className="text-xl font-semibold mb-2">Ratings</h2>
              <p><strong>Rating:</strong> {restaurantDetails.rating} / 10</p>
              <p><strong>Reviews:</strong> {restaurantDetails.reviews}</p>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">
          Loading restaurant details... 
          {name && state && city ? '' : 'Missing restaurant information'}
        </p>
      )}
    </div>
  );
}

export default Food;