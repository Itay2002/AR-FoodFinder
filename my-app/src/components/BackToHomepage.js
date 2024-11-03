// src/components/BackToHomepage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function BackToHomepage() {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate('/')}>
      Back to Homepage
    </button>
  );
}

export default BackToHomepage;
