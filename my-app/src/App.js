import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import City from './pages/City';
import Food from './pages/Food';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<div className='Homepage'><Homepage /></div>} />
        <Route path='/City' element={<City />} />
        <Route path='/Food' element={<Food />} />
      </Routes>
    </Router>
  );
}

export default App;
