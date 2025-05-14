import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCategories.scss';

const ProductCategories = ({ categories }) => {
  // Fallback categories if API request fails
  const fallbackCategories = [
    { 
      _id: '1', 
      name: 'Sofas', 
      slug: 'sofas', 
      image: '/images/living_room.jpg',
      productCount: 150
    },
    { 
      _id: '2', 
      name: 'Chairs', 
      slug: 'chairs', 
      image: '/images/01.jpeg',
      productCount: 95
    },
    { 
      _id: '3', 
      name: 'Dining Tables', 
      slug: 'dining-tables', 
      image: '/images/05.jpeg',
      productCount: 120
    },
    { 
      _id: '4', 
      name: 'Beds', 
      slug: 'beds', 
      image: '/images/bedroom.jpg',
      productCount: 85
    },
    { 
      _id: '5', 
      name: 'Consoles', 
      slug: 'consoles', 
      image: '/images/09.jpeg', 
      productCount: 110
    },
    { 
      _id: '6', 
      name: 'Coffee Tables', 
      slug: 'coffee-tables', 
      image: '/images/13.jpeg',
      productCount: 70
    }
  ];
  
  // Use provided categories or fallback if empty
  const displayCategories = categories && categories.length > 0 ? categories : fallbackCategories;
  
  return (
    <section className="categories">
      <div className="container">
        <div className="section-title">
          <h2>Shop by Category</h2>
          <p>Browse our extensive collection of premium interior design products across various categories</p>
        </div>
        
        <div className="row">
          {displayCategories.map((category) => (
            <div className="col-lg-4 col-md-6" key={category._id}>
              <div className="category-card">
                <Link to={`/category/${category.slug}`}>
                  <img src={category.image} alt={category.name} />
                  <div className="category-content">
                    <h3 className="category-title">{category.name}</h3>
                    <p>{category.productCount}+ Products</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-4">
          <Link to="/categories" className="btn btn-outline-primary">View All Categories</Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;