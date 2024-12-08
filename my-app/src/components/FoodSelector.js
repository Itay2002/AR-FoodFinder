import React from 'react';

const FoodSelector = ({ foodData, onFoodSelect }) => {
  return (
    <div>
      {foodData.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        <select 
          onChange={(e) => {
            // Find the full restaurant object that matches the selected name
            const selectedRestaurant = foodData.find(
              restaurant => restaurant.name === e.target.value
            );
            // Pass the entire restaurant object
            onFoodSelect(selectedRestaurant);
          }}
        >
          <option value="">Select a restaurant</option>
          {foodData.map((restaurant, index) => (
            <option key={index} value={restaurant.name}>
              {restaurant.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default FoodSelector;