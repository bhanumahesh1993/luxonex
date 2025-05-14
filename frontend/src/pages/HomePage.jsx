// HomePage.jsx - Main landing page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import HeroSlider from '../components/HeroSlider';
import FeaturedProducts from '../components/FeaturedProducts';
import ProductCategories from '../components/ProductCategories';
import ShopFeatures from '../components/ShopFeatures';
import VirtualRoomDesigner from '../components/VirtualRoomDesigner';
import TestimonialSlider from '../components/TestimonialSlider';

const HomePage = () => {
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Fetch featured products
        const productsResponse = await axios.get('/api/products/featured');
        setFeaturedProducts(productsResponse.data);
        
        // Fetch product categories
        const categoriesResponse = await axios.get('/api/categories');
        setCategories(categoriesResponse.data);
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching home data:', error);
        setLoading(false);
      }
    };
    
    fetchHomeData();
  }, []);
  
  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading luxurious experience...</p>
      </div>
    );
  }
  
  return (
    <div className="home-page">
      <HeroSlider 
        images={[
          '/images/one.jpg',
          '/images/two.jpg',
          '/images/three.jpg',
          '/images/four.jpg',
          '/images/five.jpg'
        ]}
      />
      
      <ShopFeatures />
      
      <ProductCategories categories={categories} />
      
      <FeaturedProducts products={featuredProducts} />
      
      <VirtualRoomDesigner />
      
      <TestimonialSlider />
    </div>
  );
};

export default HomePage;