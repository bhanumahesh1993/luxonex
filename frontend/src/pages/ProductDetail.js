import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import './ProductDetail.scss';

const ProductDetail = () => {
  const { id } = useParams();
  const { getProduct, loading, error } = useProducts();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      const data = await getProduct(id);
      setProduct(data);
    };
    fetchProduct();
  }, [id, getProduct]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleWishlistToggle = () => {
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
    } else {
      addToWishlist(product);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!product) return <div className="error">Product not found</div>;

  return (
    <div className="product-detail">
      <div className="product-gallery">
        <div className="main-image">
          <img src={product.images[selectedImage]} alt={product.name} />
        </div>
        <div className="thumbnail-list">
          {product.images.map((image, index) => (
            <div
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`${product.name} - ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>

      <div className="product-info">
        <h1>{product.name}</h1>
        <p className="price">${product.price.toFixed(2)}</p>
        <p className="description">{product.description}</p>

        <div className="product-meta">
          <div className="meta-item">
            <span className="label">Category:</span>
            <span className="value">{product.category}</span>
          </div>
          <div className="meta-item">
            <span className="label">Availability:</span>
            <span className="value">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
          </div>
        </div>

        <div className="product-actions">
          <div className="quantity-selector">
            <button
              onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
            <button
              onClick={() => setQuantity(prev => prev + 1)}
            >
              +
            </button>
          </div>

          <button
            className="add-to-cart"
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            Add to Cart
          </button>

          <button
            className={`wishlist-btn ${isInWishlist(product._id) ? 'active' : ''}`}
            onClick={handleWishlistToggle}
          >
            <i className={`fas fa-heart ${isInWishlist(product._id) ? 'fas' : 'far'}`}></i>
          </button>
        </div>

        <div className="product-features">
          <div className="feature">
            <i className="fas fa-truck"></i>
            <span>Free Shipping</span>
          </div>
          <div className="feature">
            <i className="fas fa-undo"></i>
            <span>30-Day Returns</span>
          </div>
          <div className="feature">
            <i className="fas fa-shield-alt"></i>
            <span>2-Year Warranty</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 