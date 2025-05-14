import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

export const useWishlist = () => {
  return useContext(WishlistContext);
};

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      fetchWishlist();
    } else {
      setWishlist([]);
      setLoading(false);
    }
  }, [user]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get('/api/wishlist');
      setWishlist(response.data.items);
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      const response = await axios.post('/api/wishlist', { productId });
      setWishlist(response.data.items);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add item to wishlist';
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(`/api/wishlist/${productId}`);
      setWishlist(response.data.items);
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to remove item from wishlist';
    }
  };

  const clearWishlist = async () => {
    try {
      await axios.delete('/api/wishlist');
      setWishlist([]);
    } catch (error) {
      throw error.response?.data?.message || 'Failed to clear wishlist';
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some(item => item.productId === productId);
  };

  const value = {
    wishlist,
    loading,
    addToWishlist,
    removeFromWishlist,
    clearWishlist,
    isInWishlist
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
}; 