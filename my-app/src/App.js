import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import City from './pages/City';
import Food from './pages/Food';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root to AR-FoodFinder page */}
       
        
        {/* Define your routes */}
        <Route path="/" element={<Homepage />} />
        <Route path="/City" element={<City />} />
        <Route path="/Food" element={<Food />} />
      </Routes>
    </Router>
  );
}

export default App;
