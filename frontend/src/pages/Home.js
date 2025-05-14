import React from 'react';
import { Link } from 'react-router-dom';
import sofaSet from '../images/products/sofa-set.jpeg';
import diningTable from '../images/products/dining-table.jpg';
import bedFrame from '../images/products/bed-frame.jpeg';
import officeDesk from '../images/products/office-desk.jpg';
import livingRoom from '../images/categories/living-room.jpeg';
import bedroom from '../images/categories/bedroom.jpg';
import diningRoom from '../images/categories/dining-room.jpeg';
import office from '../images/categories/office.jpg';
import Hero from '../components/Hero';
import './Home.scss';

const Home = () => {
  const featuredProducts = [
    {
      id: 1,
      name: 'Modern Sofa Set',
      price: 1299.99,
      image: sofaSet,
      category: 'living-room'
    },
    {
      id: 2,
      name: 'Elegant Dining Table',
      price: 899.99,
      image: diningTable,
      category: 'dining-room'
    },
    {
      id: 3,
      name: 'Luxury Bed Frame',
      price: 1499.99,
      image: bedFrame,
      category: 'bedroom'
    },
    {
      id: 4,
      name: 'Office Desk',
      price: 499.99,
      image: officeDesk,
      category: 'office'
    }
  ];

  const categories = [
    {
      id: 'living-room',
      name: 'Living Room',
      image: livingRoom
    },
    {
      id: 'bedroom',
      name: 'Bedroom',
      image: bedroom
    },
    {
      id: 'dining-room',
      name: 'Dining Room',
      image: diningRoom
    },
    {
      id: 'office',
      name: 'Office',
      image: office
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <Hero />

      {/* Categories Section */}
      <section className="categories">
        <div className="section-header">
          <h2>Shop by Category</h2>
          <p>Find the perfect furniture for every room</p>
        </div>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={`/products?category=${category.id}`} key={category.id} className="category-card">
              <div className="category-image">
                <img src={category.image} alt={category.name} />
              </div>
              <h3>{category.name}</h3>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Our most popular pieces</p>
        </div>
        <div className="products-grid">
          {featuredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <img src={product.image} alt={product.name} />
                <div className="product-overlay">
                  <Link to={`/products/${product.id}`} className="btn btn-primary">
                    View Details
                  </Link>
                </div>
              </div>
              <div className="product-info">
                <h3>{product.name}</h3>
                <p className="price">${product.price.toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="view-all">
          <Link to="/products" className="btn btn-primary">View All Products</Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="features-grid">
          <div className="feature">
            <i className="fas fa-truck"></i>
            <h3>Free Shipping</h3>
            <p>On orders over $1000</p>
          </div>
          <div className="feature">
            <i className="fas fa-undo"></i>
            <h3>Easy Returns</h3>
            <p>30-day return policy</p>
          </div>
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <h3>Secure Payment</h3>
            <p>100% secure checkout</p>
          </div>
          <div className="feature">
            <i className="fas fa-headset"></i>
            <h3>24/7 Support</h3>
            <p>Dedicated support team</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 