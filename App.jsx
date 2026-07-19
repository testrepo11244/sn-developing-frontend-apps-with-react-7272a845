import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import LandingPage from './LandingPage'; 
import ProductList from './ProductList';
import CartItem from './CartItem';
import { totalCartQuantity } from './redux/cartSlice';
import './App.css';

function App() {
  const [page, setPage] = useState('home');
  const totalQuantity = useSelector(totalCartQuantity);

  const handleGetStarted = () => {
    setPage('products');
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => setPage('home')}>
          Paradise Nursery
        </div>
        <div className="navbar-links">
          <span onClick={() => setPage('home')}>Home</span>
          <span onClick={() => setPage('products')}>Plants</span>
          <span onClick={() => setPage('cart')} className="cart-icon">
            Cart {totalQuantity > 0 && <span className="badge">{totalQuantity}</span>}
          </span>
        </div>
      </nav>

      {page === 'home' && (
        <div className="landing-page">
          <h1>Welcome to Paradise Nursery</h1>
          <p>Your online destination for beautiful houseplants</p>
          <button onClick={handleGetStarted} className="get-started-btn">
            Get Started
          </button>
        </div>
      )}

      {page === 'products' && <ProductList />}
      {page === 'cart' && <CartItem onContinueShopping={() => setPage('products')} />}
    </div>
  );
}

export default App;