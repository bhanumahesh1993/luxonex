import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const ProductContext = createContext();

export const useProducts = () => {
  return useContext(ProductContext);
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const getProductById = async (id) => {
    try {
      const response = await axios.get(`/api/products/${id}`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to fetch product';
    }
  };

  const getProductsByCategory = async (categoryId) => {
    try {
      const response = await axios.get(`/api/products/category/${categoryId}`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to fetch products by category';
    }
  };

  const searchProducts = async (query) => {
    try {
      const response = await axios.get(`/api/products/search?q=${query}`);
      return response.data;
    } catch (err) {
      throw err.response?.data?.message || 'Failed to search products';
    }
  };

  const value = {
    products,
    categories,
    loading,
    error,
    getProductById,
    getProductsByCategory,
    searchProducts
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}; 