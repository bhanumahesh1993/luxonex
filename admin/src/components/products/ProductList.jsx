import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import ProductFilters from './ProductFilters';
import Pagination from '../common/Pagination';
import './ProductList.scss';

const ProductList = () => {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    priceMin: '',
    priceMax: '',
    searchTerm: '',
    sortBy: 'createdAt',
    sortDirection: 'desc'
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [allSelected, setAllSelected] = useState(false);
  
  // Fetch products with current filters and pagination
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const queryParams = new URLSearchParams({
          page: pagination.currentPage,
          limit: pagination.itemsPerPage,
          sortBy: filters.sortBy,
          sortDirection: filters.sortDirection
        });
        
        if (filters.category) queryParams.append('category', filters.category);
        if (filters.priceMin) queryParams.append('priceMin', filters.priceMin);
        if (filters.priceMax) queryParams.append('priceMax', filters.priceMax);
        if (filters.searchTerm) queryParams.append('search', filters.searchTerm);
        
        const response = await axios.get(`/api/admin/products?${queryParams.toString()}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setProducts(response.data.products);
        setPagination({
          currentPage: response.data.currentPage,
          totalPages: response.data.totalPages,
          totalItems: response.data.totalItems,
          itemsPerPage: response.data.itemsPerPage
        });
        
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch products. Please try again.');
        setLoading(false);
        console.error('Error fetching products:', err);
      }
    };
    
    fetchProducts();
  }, [token, filters, pagination.currentPage, pagination.itemsPerPage]);
  
  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters });
    setPagination({ ...pagination, currentPage: 1 }); // Reset to first page on filter change
  };
  
  // Handle page change
  const handlePageChange = (newPage) => {
    setPagination({ ...pagination, currentPage: newPage });
  };
  
  // Handle product selection
  const handleProductSelect = (productId) => {
    if (selectedProducts.includes(productId)) {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
      setAllSelected(false);
    } else {
      setSelectedProducts([...selectedProducts, productId]);
      if (selectedProducts.length + 1 === products.length) {
        setAllSelected(true);
      }
    }
  };
  
  // Handle select all
  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedProducts([]);
      setAllSelected(false);
    } else {
      setSelectedProducts(products.map(product => product._id));
      setAllSelected(true);
    }
  };
  
  // Handle bulk actions
  const handleBulkAction = async (action) => {
    if (selectedProducts.length === 0) return;
    
    try {
      switch (action) {
        case 'delete':
          if (window.confirm(`Are you sure you want to delete ${selectedProducts.length} products?`)) {
            await axios.post('/api/admin/products/bulk-delete', { productIds: selectedProducts }, {
              headers: { Authorization: `Bearer ${token}` }
            });
            
            // Refresh product list
            const updatedProducts = products.filter(product => !selectedProducts.includes(product._id));
            setProducts(updatedProducts);
            setSelectedProducts([]);
            setAllSelected(false);
          }
          break;
          
        case 'feature':
          await axios.post('/api/admin/products/bulk-update', {
            productIds: selectedProducts,
            update: { featured: true }
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // Update local state
          const updatedProducts = products.map(product => 
            selectedProducts.includes(product._id) 
              ? { ...product, featured: true } 
              : product
          );
          setProducts(updatedProducts);
          break;
          
        case 'unfeature':
          await axios.post('/api/admin/products/bulk-update', {
            productIds: selectedProducts,
            update: { featured: false }
          }, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          // Update local state
          const updatedProducts2 = products.map(product => 
            selectedProducts.includes(product._id) 
              ? { ...product, featured: false } 
              : product
          );
          setProducts(updatedProducts2);
          break;
          
        default:
          break;
      }
    } catch (err) {
      setError(`Failed to perform bulk action: ${err.message}`);
      console.error('Error performing bulk action:', err);
    }
  };
  
  // Delete a single product
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`/api/admin/products/${productId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Update local state
        setProducts(products.filter(product => product._id !== productId));
        setSelectedProducts(selectedProducts.filter(id => id !== productId));
      } catch (err) {
        setError(`Failed to delete product: ${err.message}`);
        console.error('Error deleting product:', err);
      }
    }
  };
  
  if (loading && products.length === 0) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }
  
  return (
    <div className="product-list-container">
      <div className="page-header">
        <h1>Products</h1>
        <Link to="/admin/products/create" className="btn btn-primary">
          <i className="fas fa-plus"></i> Add New Product
        </Link>
      </div>
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <ProductFilters 
        filters={filters} 
        onFilterChange={handleFilterChange} 
      />
      
      <div className="bulk-actions">
        <div className="selected-count">
          {selectedProducts.length > 0 ? (
            <span>{selectedProducts.length} items selected</span>
          ) : (
            <span>No items selected</span>
          )}
        </div>
        
        <div className="action-buttons">
          <button 
            className="btn btn-sm btn-outline-primary"
            onClick={() => handleBulkAction('feature')}
            disabled={selectedProducts.length === 0}
          >
            <i className="fas fa-star"></i> Feature
          </button>
          <button 
            className="btn btn-sm btn-outline-secondary"
            onClick={() => handleBulkAction('unfeature')}
            disabled={selectedProducts.length === 0}
          >
            <i className="far fa-star"></i> Unfeature
          </button>
          <button 
            className="btn btn-sm btn-outline-danger"
            onClick={() => handleBulkAction('delete')}
            disabled={selectedProducts.length === 0}
          >
            <i className="fas fa-trash"></i> Delete
          </button>
        </div>
      </div>
      
      <div className="product-table-container">
        <table className="product-table">
          <thead>
            <tr>
              <th>
                <input 
                  type="checkbox" 
                  checked={allSelected}
                  onChange={handleSelectAll}
                />
              </th>
              <th>Image</th>
              <th>
                <button 
                  className={`sort-btn ${filters.sortBy === 'name' ? 'active' : ''}`}
                  onClick={() => handleFilterChange({
                    sortBy: 'name',
                    sortDirection: filters.sortBy === 'name' && filters.sortDirection === 'asc' ? 'desc' : 'asc'
                  })}
                >
                  Name
                  {filters.sortBy === 'name' && (
                    <i className={`fas fa-sort-${filters.sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                  )}
                </button>
              </th>
              <th>Category</th>
              <th>
                <button 
                  className={`sort-btn ${filters.sortBy === 'price' ? 'active' : ''}`}
                  onClick={() => handleFilterChange({
                    sortBy: 'price',
                    sortDirection: filters.sortBy === 'price' && filters.sortDirection === 'asc' ? 'desc' : 'asc'
                  })}
                >
                  Price
                  {filters.sortBy === 'price' && (
                    <i className={`fas fa-sort-${filters.sortDirection === 'asc' ? 'up' : 'down'}`}></i>
                  )}
                </button>
              </th>
              <th>Stock</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map(product => (
                <tr key={product._id}>
                  <td>
                    <input 
                      type="checkbox" 
                      checked={selectedProducts.includes(product._id)}
                      onChange={() => handleProductSelect(product._id)}
                    />
                  </td>
                  <td>
                    <div className="product-image">
                      <img 
                        src={product.images && product.images.length > 0 
                          ? product.images[0] 
                          : '/images/placeholder.jpg'
                        } 
                        alt={product.name}
                      />
                    </div>
                  </td>
                  <td>
                    <div className="product-name">
                      <Link to={`/admin/products/edit/${product._id}`}>
                        {product.name}
                      </Link>
                      {product.featured && <span className="featured-badge">Featured</span>}
                    </div>
                  </td>
                  <td>{product.category}</td>
                  <td>
                    {product.salePrice ? (
                      <div className="price-display">
                        <span className="sale-price">${product.salePrice.toFixed(2)}</span>
                        <span className="regular-price">${product.price.toFixed(2)}</span>
                      </div>
                    ) : (
                      <span>${product.price.toFixed(2)}</span>
                    )}
                  </td>
                  <td>
                    <span className={`stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                      {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                    </span>
                  </td>
                  <td>
                    <div className="status-indicator">
                      <span className={`status-badge ${product.status}`}>
                        {product.status || 'Active'}
                      </span>
                    </div>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <Link 
                        to={`/admin/products/edit/${product._id}`} 
                        className="btn btn-sm btn-outline-primary"
                        title="Edit"
                      >
                        <i className="fas fa-edit"></i>
                      </Link>
                      <Link 
                        to={`/product/${product._id}`} 
                        className="btn btn-sm btn-outline-secondary"
                        title="View"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <i className="fas fa-eye"></i>
                      </Link>
                      <button 
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDeleteProduct(product._id)}
                        title="Delete"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="no-products">
                  <p>No products found. Try adjusting your filters or adding new products.</p>
                  <Link to="/admin/products/create" className="btn btn-primary">
                    <i className="fas fa-plus"></i> Add New Product
                  </Link>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <Pagination 
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        onPageChange={handlePageChange}
        totalItems={pagination.totalItems}
        itemsPerPage={pagination.itemsPerPage}
      />
    </div>
  );
};

export default ProductList;