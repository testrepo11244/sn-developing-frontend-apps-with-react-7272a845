import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductList from './components/ProductList';
import CartItem from './components/CartItem';
import './App.css';

function LandingPage() {
  const navigate = useNavigate();
  return (
    <div className="landing">
      <h1>Paradise Nursery</h1>
      <button onClick={() => navigate('/products')}>Get Started</button>
    </div>
  );
}

function Navbar() {
  const totalItems = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));
  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Plants</Link>
      <Link to="/cart">Cart ({totalItems})</Link>
    </nav>
  );
}

function Layout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route element={<Layout />}>
          <Route path="/products" element={<ProductList />} />
          <Route path="/cart" element={<CartItem />} />
        </Route>
      </Routes>
    </Router>
  );
}