import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeFromCart } from '../Redux/CartSlice';
import { Link } from 'react-router-dom';

export default function CartItem() {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();
  const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Plants</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
      </nav>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.thumbnail} alt={item.name} />
              <div>
                <h3>{item.name}</h3>
                <p>Unit Price: ${item.price}</p>
                <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>
                <div>
                  <button onClick={() => dispatch(decrementQuantity(item.id))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(incrementQuantity(item.id))}>+</button>
                </div>
                <button onClick={() => dispatch(removeFromCart(item.id))}>Delete</button>
              </div>
            </div>
          ))}
          <h2>Total Amount: ${totalAmount}</h2>
          <button onClick={() => alert('Coming Soon')}>Checkout</button>
          <Link to="/products">
            <button>Continue Shopping</button>
          </Link>
        </div>
      )}
    </div>
  );
}