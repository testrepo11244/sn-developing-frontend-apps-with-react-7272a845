import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function Navbar() {
  const totalQuantity = useSelector(state =>
    state.cart.items.reduce((sum, item) => sum + item.quantity, 0)
  );

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>
      <Link to="/products">Plants</Link>
      <Link to="/cart" className="cart-link">
        Cart ({totalQuantity})
      </Link>
    </nav>
  );
}

const plantsData = [
  { id: 1, name: 'Peace Lily', price: 15.99, thumbnail: 'https://via.placeholder.com/150?text=Peace+Lily', category: 'Indoor' },
  { id: 2, name: 'Snake Plant', price: 12.99, thumbnail: 'https://via.placeholder.com/150?text=Snake+Plant', category: 'Indoor' },
  { id: 3, name: 'Spider Plant', price: 9.99, thumbnail: 'https://via.placeholder.com/150?text=Spider+Plant', category: 'Indoor' },
  { id: 4, name: 'Pothos', price: 8.99, thumbnail: 'https://via.placeholder.com/150?text=Pothos', category: 'Indoor' },
  { id: 5, name: 'ZZ Plant', price: 16.99, thumbnail: 'https://via.placeholder.com/150?text=ZZ+Plant', category: 'Indoor' },
  { id: 6, name: 'Philodendron', price: 11.99, thumbnail: 'https://via.placeholder.com/150?text=Philodendron', category: 'Indoor' },
  { id: 7, name: 'Rose Bush', price: 19.99, thumbnail: 'https://via.placeholder.com/150?text=Rose+Bush', category: 'Outdoor' },
  { id: 8, name: 'Lavender', price: 10.99, thumbnail: 'https://via.placeholder.com/150?text=Lavender', category: 'Outdoor' },
  { id: 9, name: 'Hibiscus', price: 14.99, thumbnail: 'https://via.placeholder.com/150?text=Hibiscus', category: 'Outdoor' },
  { id: 10, name: 'Hydrangea', price: 17.99, thumbnail: 'https://via.placeholder.com/150?text=Hydrangea', category: 'Outdoor' },
  { id: 11, name: 'Bougainvillea', price: 21.99, thumbnail: 'https://via.placeholder.com/150?text=Bougainvillea', category: 'Outdoor' },
  { id: 12, name: 'Daisy', price: 7.99, thumbnail: 'https://via.placeholder.com/150?text=Daisy', category: 'Outdoor' },
  { id: 13, name: 'Aloe Vera', price: 8.49, thumbnail: 'https://via.placeholder.com/150?text=Aloe+Vera', category: 'Succulents' },
  { id: 14, name: 'Echeveria', price: 6.99, thumbnail: 'https://via.placeholder.com/150?text=Echeveria', category: 'Succulents' },
  { id: 15, name: 'Jade Plant', price: 12.49, thumbnail: 'https://via.placeholder.com/150?text=Jade+Plant', category: 'Succulents' },
  { id: 16, name: 'Haworthia', price: 7.49, thumbnail: 'https://via.placeholder.com/150?text=Haworthia', category: 'Succulents' },
  { id: 17, name: 'Sedum', price: 9.99, thumbnail: 'https://via.placeholder.com/150?text=Sedum', category: 'Succulents' },
  { id: 18, name: 'Cactus', price: 5.99, thumbnail: 'https://via.placeholder.com/150?text=Cactus', category: 'Succulents' },
];

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);

  // Group plants by category
  const categories = plantsData.reduce((acc, plant) => {
    if (!acc[plant.category]) {
      acc[plant.category] = [];
    }
    acc[plant.category].push(plant);
    return acc;
  }, {});

  const handleAddToCart = (plant) => {
    dispatch(addToCart(plant));
  };

  const isInCart = (plantId) => cartItems.some(item => item.id === plantId);

  return (
    <div className="product-listing">
      <Navbar />
      <h1>Our Plants</h1>
      {Object.keys(categories).map(category => (
        <div key={category} className="category-section">
          <h2>{category}</h2>
          <div className="plant-grid">
            {categories[category].map(plant => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} className="plant-thumbnail" />
                <h3>{plant.name}</h3>
                <p>${plant.price.toFixed(2)}</p>
                <button
                  onClick={() => handleAddToCart(plant)}
                  disabled={isInCart(plant.id)}
                  className={isInCart(plant.id) ? 'added-btn' : 'add-to-cart-btn'}
                >
                  {isInCart(plant.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;