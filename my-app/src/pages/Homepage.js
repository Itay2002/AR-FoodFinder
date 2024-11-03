import '../App.css';
import React from 'react';
import CitySelector from '../components/CitySelector';

function Homepage() {
  return (
    <div>
      <h1>Welcome to AR - FoodFinder</h1>
      <p>Select a city in Arkansas!</p>
      <CitySelector stateName="AR" />
    </div>
  );
}

export default Homepage;
