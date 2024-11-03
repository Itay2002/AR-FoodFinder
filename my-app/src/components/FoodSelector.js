import React from 'react';

const FoodSelector = ({ foodData, onFoodSelect }) => {
  return (
    <div>
      {foodData.length === 0 ? (
        <p>No entries yet</p>
      ) : (
        <select onChange={(e) => onFoodSelect(e.target.value)}>
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
