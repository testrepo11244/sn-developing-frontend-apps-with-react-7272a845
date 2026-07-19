import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addItem } from './redux/cartSlice';

const categories = [
  {
    name: 'Indoor Plants',
    plants: [
      { id: 1, name: 'Peace Lily', price: 15.99, thumbnail: 'https://via.placeholder.com/150?text=Peace+Lily' },
      { id: 2, name: 'Snake Plant', price: 12.49, thumbnail: 'https://via.placeholder.com/150?text=Snake+Plant' },
      { id: 3, name: 'Spider Plant', price: 9.99, thumbnail: 'https://via.placeholder.com/150?text=Spider+Plant' },
      { id: 4, name: 'Philodendron', price: 11.49, thumbnail: 'https://via.placeholder.com/150?text=Philodendron' },
      { id: 5, name: 'Pothos', price: 8.99, thumbnail: 'https://via.placeholder.com/150?text=Pothos' },
      { id: 6, name: 'ZZ Plant', price: 14.99, thumbnail: 'https://via.placeholder.com/150?text=ZZ+Plant' },
    ]
  },
  {
    name: 'Outdoor Plants',
    plants: [
      { id: 7, name: 'Rosemary', price: 7.99, thumbnail: 'https://via.placeholder.com/150?text=Rosemary' },
      { id: 8, name: 'Lavender', price: 9.49, thumbnail: 'https://via.placeholder.com/150?text=Lavender' },
      { id: 9, name: 'Basil', price: 5.99, thumbnail: 'https://via.placeholder.com/150?text=Basil' },
      { id: 10, name: 'Mint', price: 4.99, thumbnail: 'https://via.placeholder.com/150?text=Mint' },
      { id: 11, name: 'Thyme', price: 6.49, thumbnail: 'https://via.placeholder.com/150?text=Thyme' },
      { id: 12, name: 'Oregano', price: 5.49, thumbnail: 'https://via.placeholder.com/150?text=Oregano' },
    ]
  },
  {
    name: 'Succulents',
    plants: [
      { id: 13, name: 'Aloe Vera', price: 10.99, thumbnail: 'https://via.placeholder.com/150?text=Aloe+Vera' },
      { id: 14, name: 'Echeveria', price: 6.99, thumbnail: 'https://via.placeholder.com/150?text=Echeveria' },
      { id: 15, name: 'Jade Plant', price: 8.49, thumbnail: 'https://via.placeholder.com/150?text=Jade+Plant' },
      { id: 16, name: 'Haworthia', price: 7.49, thumbnail: 'https://via.placeholder.com/150?text=Haworthia' },
      { id: 17, name: 'Sedum', price: 5.99, thumbnail: 'https://via.placeholder.com/150?text=Sedum' },
      { id: 18, name: 'Cactus', price: 9.99, thumbnail: 'https://via.placeholder.com/150?text=Cactus' },
    ]
  }
];

const ProductList = () => {
  const cartItems = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const isPlantInCart = (plantId) => cartItems.some(item => item.id === plantId);

  const handleAddToCart = (plant) => {
    dispatch(addItem({ id: plant.id, name: plant.name, price: plant.price, thumbnail: plant.thumbnail }));
  };

  return (
    <div className="product-list">
      <h2>Our Plant Collection</h2>
      {categories.map((category, catIndex) => (
        <div key={catIndex} className="category-section">
          <h3>{category.name}</h3>
          <div className="plants-grid">
            {category.plants.map(plant => (
              <div key={plant.id} className="plant-card">
                <img src={plant.thumbnail} alt={plant.name} className="plant-thumbnail" />
                <h4>{plant.name}</h4>
                <p>${plant.price.toFixed(2)}</p>
                <button 
                  onClick={() => handleAddToCart(plant)} 
                  disabled={isPlantInCart(plant.id)}
                >
                  {isPlantInCart(plant.id) ? 'Added' : 'Add to Cart'}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;