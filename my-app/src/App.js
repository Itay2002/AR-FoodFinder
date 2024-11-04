import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import City from './pages/City';
import Food from './pages/Food';

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect root path to /AR-FoodFinder */}
        <Route path="/" element={<Navigate to="/AR-FoodFinder" replace />} />
        <Route path="/AR-FoodFinder" element={<Homepage />} />
        <Route path="/City" element={<City />} />
        <Route path="/Food" element={<Food />} />
      </Routes>
    </Router>
  );
}

export default App;
