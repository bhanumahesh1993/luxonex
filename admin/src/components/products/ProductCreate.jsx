import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ProductForm from './ProductForm';
import './ProductCreate.scss';

const ProductCreate = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  
  // Initial product state with default values
  const initialProduct = {
    name: '',
    description: '',
    price: '',
    salePrice: '',
    category: '',
    stock: 10,
    images: [],
    featured: false,
    status: 'active',
    materials: [],
    colors: [],
    dimensions: {
      length: '',
      width: '',
      height: '',
      unit: 'cm'
    },
    // Add more fields as needed for different product types
  };
  
  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/api/categories');
        setCategories(response.data);
      } catch (err) {
        setError('Failed to fetch categories. Please try again.');
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);
  
  // Handle form submission
  const handleSubmit = async (productData, images) => {
    try {
      setLoading(true);
      setError(null);
      
      // First, upload images if any
      let imageUrls = [];
      if (images && images.length > 0) {
        const formData = new FormData();
        images.forEach(image => {
          formData.append('images', image);
        });
        
        const imageResponse = await axios.post('/api/admin/upload', formData, {
          headers: { 
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
          }
        });
        
        imageUrls = imageResponse.data.urls;
      }
      
      // Create product with image URLs
      const productWithImages = {
        ...productData,
        images: imageUrls
      };
      
      const response = await axios.post('/api/admin/products', productWithImages, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setLoading(false);
      
      // Redirect to edit page of new product
      navigate(`/admin/products/edit/${response.data._id}`, {
        state: { success: 'Product created successfully!' }
      });
    } catch (err) {
      setLoading(false);
      setError(`Failed to create product: ${err.response?.data?.message || err.message}`);
      console.error('Error creating product:', err);
    }
  };
  
  return (
    <div className="product-create-container">
      <div className="page-header">
        <h1>Add New Product</h1>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <ProductForm 
        initialProduct={initialProduct}
        categories={categories}
        onSubmit={handleSubmit}
        loading={loading}
        buttonText="Create Product"
      />
    </div>
  );
};

export default ProductCreate;