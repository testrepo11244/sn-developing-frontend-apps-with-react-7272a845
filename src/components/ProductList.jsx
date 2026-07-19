import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/CartSlice';
import { Link } from 'react-router-dom';

const allPlants = [
  // Air Purifying
  { id: 1, name: 'Spider Plant', category: 'Air Purifying', price: 12.99, thumbnail: 'https://via.placeholder.com/150?text=Spider+Plant' },
  { id: 2, name: 'Peace Lily', category: 'Air Purifying', price: 15.99, thumbnail: 'https://via.placeholder.com/150?text=Peace+Lily' },
  { id: 3, name: 'Snake Plant', category: 'Air Purifying', price: 18.50, thumbnail: 'https://via.placeholder.com/150?text=Snake+Plant' },
  { id: 4, name: 'Bamboo Palm', category: 'Air Purifying', price: 22.00, thumbnail: 'https://via.placeholder.com/150?text=Bamboo+Palm' },
  { id: 5, name: 'Boston Fern', category: 'Air Purifying', price: 14.75, thumbnail: 'https://via.placeholder.com/150?text=Boston+Fern' },
  { id: 6, name: 'Aloe Vera', category: 'Air Purifying', price: 9.99, thumbnail: 'https://via.placeholder.com/150?text=Aloe+Vera' },
  // Flowering
  { id: 7, name: 'African Violet', category: 'Flowering', price: 8.50, thumbnail: 'https://via.placeholder.com/150?text=African+Violet' },
  { id: 8, name: 'Orchid', category: 'Flowering', price: 25.00, thumbnail: 'https://via.placeholder.com/150?text=Orchid' },
  { id: 9, name: 'Begonia', category: 'Flowering', price: 11.25, thumbnail: 'https://via.placeholder.com/150?text=Begonia' },
  { id: 10, name: 'Anthurium', category: 'Flowering', price: 19.99, thumbnail: 'https://via.placeholder.com/150?text=Anthurium' },
  { id: 11, name: 'Christmas Cactus', category: 'Flowering', price: 16.50, thumbnail: 'https://via.placeholder.com/150?text=Christmas+Cactus' },
  { id: 12, name: 'Kalanchoe', category: 'Flowering', price: 7.99, thumbnail: 'https://via.placeholder.com/150?text=Kalanchoe' },
  // Low Light
  { id: 13, name: 'ZZ Plant', category: 'Low Light', price: 20.00, thumbnail: 'https://via.placeholder.com/150?text=ZZ+Plant' },
  { id: 14, name: 'Pothos', category: 'Low Light', price: 10.50, thumbnail: 'https://via.placeholder.com/150?text=Pothos' },
  { id: 15, name: 'Cast Iron Plant', category: 'Low Light', price: 17.95, thumbnail: 'https://via.placeholder.com/150?text=Cast+Iron+Plant' },
  { id: 16, name: 'Parlor Palm', category: 'Low Light', price: 13.75, thumbnail: 'https://via.placeholder.com/150?text=Parlor+Palm' },
  { id: 17, name: 'Dracaena', category: 'Low Light', price: 21.50, thumbnail: 'https://via.placeholder.com/150?text=Dracaena' },
  { id: 18, name: 'Philodendron', category: 'Low Light', price: 14.25, thumbnail: 'https://via.placeholder.com/150?text=Philodendron' }
];

export default function ProductList() {
  const dispatch = useDispatch();
  const [addedIds, setAddedIds] = useState([]);
  const totalItems = useSelector(state => state.cart.items.reduce((sum, item) => sum + item.quantity, 0));

  const plantsByCategory = allPlants.reduce((acc, plant) => {
    if (!acc[plant.category]) acc[plant.category] = [];
    acc[plant.category].push(plant);
    return acc;
  }, {});

  const handleAdd = (plant) => {
    dispatch(addToCart(plant));
    setAddedIds([...addedIds, plant.id]);
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/products">Plants</Link>
        <Link to="/cart">Cart ({totalItems})</Link>
      </nav>
      <h1>Our Plants</h1>
      {Object.entries(plantsByCategory).map(([category, plantList]) => (
        <section key={category}>
          <h2>{category}</h2>
          <div className="product-grid">
            {plantList.map(plant => (
              <div key={plant.id} className="product-card">
                <img src={plant.thumbnail} alt={plant.name} />
                <h3>{plant.name}</h3>
                <p>${plant.price}</p>
                <button
                  onClick={() => handleAdd(plant)}
                  disabled={addedIds.includes(plant.id)}
                  className={addedIds.includes(plant.id) ? 'disabled' : ''}>
                  {addedIds.includes(plant.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}