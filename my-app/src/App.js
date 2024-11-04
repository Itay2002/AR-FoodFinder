import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate } from 'react-router-dom';
import Homepage from './pages/Homepage';
import City from './pages/City';
import Food from './pages/Food';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/AR-FoodFinder" />} /> 
        <Route path='/AR-FoodFinder' element={<div className='Homepage'><Homepage /></div>} />
        <Route path='/City' element={<City />} />
        <Route path='/Food' element={<Food />} />
      </Routes>
    </Router>
  );
}

export default App;
