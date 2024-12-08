import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackToHomepage from '../components/BackToHomepage';
import FoodParser from '../data/FoodParser';
import FoodSelector from '../components/FoodSelector';

const City = () => {
  const [originalFoodData, setOriginalFoodData] = useState([]);
  const [filteredFoodData, setFilteredFoodData] = useState([]);
  const [filters, setFilters] = useState({
    city: '',
    category: '',
    priceRange: '',
    rating: ''
  });
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
        const cityFilteredData = data.filter(restaurant => 
          restaurant.city.toLowerCase() === cityName.toLowerCase()
        );
        setOriginalFoodData(cityFilteredData);
        setFilteredFoodData(cityFilteredData);
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchData();
  }, [cityName]);

  // Navigate to Food page with selected restaurant details
  const handleFoodSelect = (restaurant) => {
    if (restaurant) {
      navigate(`/Food?name=${encodeURIComponent(restaurant.name)}&state=${encodeURIComponent(restaurant.state)}&city=${encodeURIComponent(restaurant.city)}`);
    }
  };

  // Handle filter input changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    let result = [...originalFoodData];

    // Apply each filter if it has a value
    if (filters.category) {
      result = result.filter(restaurant => 
        restaurant.category.toLowerCase() === filters.category.toLowerCase()
      );
    }

    if (filters.priceRange) {
      result = result.filter(restaurant => 
        restaurant.price === filters.priceRange
      );
    }

    if (filters.rating) {
      result = result.filter(restaurant => 
        restaurant.rating >= parseFloat(filters.rating)
      );
    }

    setFilteredFoodData(result);
  };

  // Get unique values for filter dropdowns
  const getUniqueFilterOptions = (field) => {
    return [...new Set(originalFoodData.map(restaurant => restaurant[field]))];
  };

  return (
    <div className="container mx-auto p-4">
      <BackToHomepage />
      <h1 className="text-2xl font-bold mb-4">Restaurants in {cityName}</h1>

      <div className="mb-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Category Filter */}
        <div>
          <label className="block mb-2">Category</label>
          <select 
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Categories</option>
            {getUniqueFilterOptions('category').map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div>
          <label className="block mb-2">Price Range</label>
          <select 
            name="priceRange"
            value={filters.priceRange}
            onChange={handleFilterChange}
            className="w-full p-2 border rounded"
          >
            <option value="">All Prices</option>
            {getUniqueFilterOptions('price').map(price => (
              <option key={price} value={price}>{price}</option>
            ))}
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block mb-2">Minimum Rating (0-10): {filters.rating || 'Any'}</label>
          <input 
            type="range"
            name="rating"
            min="0"
            max="10"
            step="0.1"
            value={filters.rating || 0}
            onChange={handleFilterChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      <div className="mb-4">
        <button 
          onClick={applyFilters}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Apply Filters
        </button>
      </div>

      {/* Restaurant Selector */}
      <FoodSelector 
        foodData={filteredFoodData}
        onFoodSelect={handleFoodSelect}
      />

      {/* Results Count */}
      <p className="mt-4 text-gray-600">
        {filteredFoodData.length} restaurant{filteredFoodData.length !== 1 ? 's' : ''} found
      </p>
    </div>
  );
};

export default City;