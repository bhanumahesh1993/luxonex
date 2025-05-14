import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductCard.scss';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };
  
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };
  
  const calculateDiscountPercentage = () => {
    if (product.salePrice && product.price > product.salePrice) {
      return Math.round(((product.price - product.salePrice) / product.price) * 100);
    }
    return 0;
  };
  
  const discountPercentage = calculateDiscountPercentage();
  
  return (
    <div className="product-card">
      {product.newArrival && <div className="product-tag tag-new">New</div>}
      {discountPercentage > 0 && <div className="product-tag tag-sale">{discountPercentage}% Off</div>}
      
      <div className="product-image">
        <Link to={`/product/${product._id}`}>
          <img 
            src={product.images && product.images.length > 0 ? product.images[0] : '/images/placeholder.jpg'} 
            alt={product.name}
            loading="lazy"
          />
        </Link>
        
        <div className="product-overlay">
          <div className="product-actions">
            <button
              className={`wishlist-btn ${isInWishlist(product._id) ? 'active' : ''}`}
              onClick={handleWishlistToggle}
              aria-label={isInWishlist(product._id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <i className={isInWishlist(product._id) ? 'fas fa-heart' : 'far fa-heart'}></i>
            </button>
            
            <button
              className="cart-btn"
              onClick={handleAddToCart}
              aria-label="Add to cart"
            >
              <i className="fas fa-shopping-bag"></i>
            </button>
            
            <Link 
              to={`/product/${product._id}`} 
              className="view-btn"
              aria-label="View product details"
            >
              <i className="fas fa-search"></i>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="product-content">
        <div className="product-category">{product.category}</div>
        <h3 className="product-title">
          <Link to={`/product/${product._id}`}>{product.name}</Link>
        </h3>
        
        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <i 
              key={i} 
              className={
                i < Math.floor(product.ratings) 
                  ? 'fas fa-star' 
                  : i < product.ratings 
                    ? 'fas fa-star-half-alt' 
                    : 'far fa-star'
              }
            ></i>
          ))}
          <span>({product.reviews ? product.reviews.length : 0})</span>
        </div>
        
        <div className="product-price">
          {product.salePrice ? (
            <>
              <span className="current-price">${product.salePrice.toFixed(2)}</span>
              <span className="old-price">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="current-price">${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;