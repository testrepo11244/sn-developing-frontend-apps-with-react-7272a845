import React from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <div className="landing-content">
        <h1>Paradise Nursery</h1>
        <p>Your neighborhood plant boutique</p>
        <button className="get-started-btn" onClick={() => navigate('/products')}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<CartItem />} />
      </Routes>
    </Router>
  );
}

export default App;