import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReviewsParser from '../data/ReviewsParser';
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

  const { name, state, city } = getQueryParams(); // Destructure the query parameters

  useEffect(() => {
    const fetchReviewsData = async () => {
      if (name && state && city) { // Ensure all parameters are available
        try {
          const data = await ReviewsParser(name, state, city); // Call the parser with correct parameters
          setRestaurantDetails(data);
        } catch (error) {
          console.error("Error fetching restaurant reviews:", error);
        }
      }
    };

    fetchReviewsData();
  }, [name, state, city]); // Dependency array to re-run when parameters change

  return (
    <div>
      <BackToHomepage />
      {restaurantDetails ? (
        <div>
          <h1>{name}</h1>
          <p>Location: {city}, {state}</p>
          <p>Rating: {restaurantDetails.stars} stars</p>
          <p>Reviews: {restaurantDetails.reviews}</p>
        </div>
      ) : (
        <p>Loading restaurant details...</p>
      )}
    </div>
  );
}

export default Food;
