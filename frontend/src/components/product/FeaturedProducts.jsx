import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import './FeaturedProducts.scss';

const FeaturedProducts = ({ products }) => {
  return (
    <section className="featured-products" id="featured-products">
      <div className="container">
        <div className="section-title">
          <h2>Featured Products</h2>
          <p>Discover our handpicked selection of premium interior products</p>
        </div>
        
        {products && products.length > 0 ? (
          <div className="row">
            {products.map((product) => (
              <div className="col-lg-3 col-md-4 col-sm-6" key={product._id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-products">
            <p>Loading featured products...</p>
          </div>
        )}
        
        <div className="text-center mt-5">
          <Link to="/shop" className="btn btn-outline-primary">View All Products</Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;