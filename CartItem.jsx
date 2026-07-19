import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { incrementQuantity, decrementQuantity, removeItem } from './redux/cartSlice';

const CartItem = ({ onContinueShopping }) => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const calculateItemTotal = (item) => (item.price * item.quantity).toFixed(2);
  const calculateTotalAmount = () => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  const handleDecrement = (id, quantity) => {
    if (quantity > 1) {
      dispatch(decrementQuantity(id));
    }
    // if quantity is 1, do nothing (user can use delete)
  };

  const handleDelete = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    alert('Coming Soon!');
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item-row">
                <img src={item.thumbnail} alt={item.name} className="cart-thumbnail" />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>Unit Price: ${item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button
                      onClick={() => handleDecrement(item.id, item.quantity)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item.id)}>+</button>
                  </div>
                  <p>Total: ${calculateItemTotal(item)}</p>
                  <button className="delete-btn" onClick={() => handleDelete(item.id)}>
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total Amount: ${calculateTotalAmount()}</h3>
            <button className="checkout-btn" onClick={handleCheckout}>
              Checkout
            </button>
            <button className="continue-shopping-btn" onClick={onContinueShopping}>
              Continue Shopping
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;