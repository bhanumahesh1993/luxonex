import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './ProductForm.scss';

const ProductForm = ({ initialProduct, categories, onSubmit, loading, buttonText = 'Save' }) => {
  const [product, setProduct] = useState(initialProduct);
  const [errors, setErrors] = useState({});
  const [selectedImages, setSelectedImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [activeTab, setActiveTab] = useState('general');
  const fileInputRef = useRef(null);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      setProduct({ ...product, [name]: checked });
    } else if (name.includes('.')) {
      // Handle nested properties (e.g., dimensions.length)
      const [parent, child] = name.split('.');
      setProduct({
        ...product,
        [parent]: {
          ...product[parent],
          [child]: value
        }
      });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };
  
  // Handle rich text editor changes
  const handleDescriptionChange = (value) => {
    setProduct({ ...product, detailedDescription: value });
  };
  
  // Handle array fields (materials, colors, etc.)
  const handleArrayFieldChange = (name, value) => {
    // Split comma-separated values and trim whitespace
    const arrayValues = value.split(',').map(item => item.trim()).filter(item => item);
    setProduct({ ...product, [name]: arrayValues });
  };
  
  // Handle image selection
  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);
    
    if (files.length > 0) {
      // Preview images
      const newSelectedImages = files.map(file => URL.createObjectURL(file));
      setSelectedImages([...selectedImages, ...newSelectedImages]);
      
      // Store files for upload
      setImageFiles([...imageFiles, ...files]);
    }
  };
  
  // Remove selected image
  const handleRemoveImage = (index) => {
    const updatedImages = [...selectedImages];
    updatedImages.splice(index, 1);
    setSelectedImages(updatedImages);
    
    const updatedFiles = [...imageFiles];
    updatedFiles.splice(index, 1);
    setImageFiles(updatedFiles);
  };
  
  // Trigger file input click
  const handleImageButtonClick = () => {
    fileInputRef.current.click();
  };
  
  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    
    if (!product.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!product.description.trim()) {
      newErrors.description = 'Product description is required';
    }
    
    if (!product.category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!product.price || isNaN(product.price) || parseFloat(product.price) <= 0) {
      newErrors.price = 'Please enter a valid price';
    }
    
    if (product.salePrice && (isNaN(product.salePrice) || parseFloat(product.salePrice) <= 0)) {
      newErrors.salePrice = 'Please enter a valid sale price';
    }
    
    if (product.salePrice && parseFloat(product.salePrice) >= parseFloat(product.price)) {
      newErrors.salePrice = 'Sale price must be lower than regular price';
    }
    
    if (!product.stock || isNaN(product.stock) || parseInt(product.stock) < 0) {
      newErrors.stock = 'Please enter a valid stock quantity';
    }
    
    if (product.dimensions) {
      if (product.dimensions.length && (isNaN(product.dimensions.length) || parseFloat(product.dimensions.length) <= 0)) {
        newErrors['dimensions.length'] = 'Please enter a valid length';
      }
      
      if (product.dimensions.width && (isNaN(product.dimensions.width) || parseFloat(product.dimensions.width) <= 0)) {
        newErrors['dimensions.width'] = 'Please enter a valid width';
      }
      
      if (product.dimensions.height && (isNaN(product.dimensions.height) || parseFloat(product.dimensions.height) <= 0)) {
        newErrors['dimensions.height'] = 'Please enter a valid height';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    // Prepare product data
    const productData = {
      ...product,
      price: parseFloat(product.price),
      salePrice: product.salePrice ? parseFloat(product.salePrice) : undefined,
      stock: parseInt(product.stock),
      dimensions: {
        length: product.dimensions.length ? parseFloat(product.dimensions.length) : undefined,
        width: product.dimensions.width ? parseFloat(product.dimensions.width) : undefined,
        height: product.dimensions.height ? parseFloat(product.dimensions.height) : undefined,
        unit: product.dimensions.unit
      }
    };
    
    // Call the onSubmit function with the prepared data and image files
    onSubmit(productData, imageFiles);
  };
  
  // Generate category-specific fields based on selected category
  const renderCategorySpecificFields = () => {
    switch (product.category.toLowerCase()) {
      case 'sofa':
        return (
          <div className="category-specific-fields">
            <h3>Sofa Specific Details</h3>
            
            <div className="form-group">
              <label htmlFor="sofaCategory">Sofa Type</label>
              <select
                id="sofaCategory"
                name="sofaCategory"
                className="form-control"
                value={product.sofaCategory || ''}
                onChange={handleChange}
              >
                <option value="">Select Sofa Type</option>
                <option value="3 Seater">3 Seater</option>
                <option value="2 Seater">2 Seater</option>
                <option value="L Shape">L Shape</option>
                <option value="Sectional">Sectional</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="seatUpholstery">Seat Upholstery</label>
              <input
                type="text"
                id="seatUpholstery"
                name="seatUpholstery.catalogName"
                className="form-control"
                placeholder="Catalog Name"
                value={product.seatUpholstery?.catalogName || ''}
                onChange={handleChange}
              />
            </div>
            
            {/* Add more sofa-specific fields here */}
          </div>
        );
        
      case 'chair':
        return (
          <div className="category-specific-fields">
            <h3>Chair Specific Details</h3>
            
            <div className="form-group">
              <label htmlFor="chairType">Chair Type</label>
              <select
                id="chairType"
                name="type"
                className="form-control"
                value={product.type || ''}
                onChange={handleChange}
              >
                <option value="">Select Chair Type</option>
                <option value="Dining Chair">Dining Chair</option>
                <option value="Accent Chair">Accent Chair</option>
                <option value="Office Chair">Office Chair</option>
                <option value="Lounge Chair">Lounge Chair</option>
              </select>
            </div>
            
            {/* Add more chair-specific fields here */}
          </div>
        );
        
      // Add more cases for other categories
        
      default:
        return null;
    }
  };
  
  return (
    <div className="product-form-container">
      <ul className="nav nav-tabs" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'general' ? 'active' : ''}`}
            onClick={() => setActiveTab('general')}
            type="button"
          >
            General
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'details' ? 'active' : ''}`}
            onClick={() => setActiveTab('details')}
            type="button"
          >
            Details & Specifications
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'images' ? 'active' : ''}`}
            onClick={() => setActiveTab('images')}
            type="button"
          >
            Images
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'category-specific' ? 'active' : ''}`}
            onClick={() => setActiveTab('category-specific')}
            type="button"
            disabled={!product.category}
          >
            Category Specific
          </button>
        </li>
      </ul>
      
      <form onSubmit={handleSubmit}>
        {/* General Tab */}
        <div className={`tab-content ${activeTab === 'general' ? 'active' : ''}`}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Product Name*</label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                value={product.name}
                onChange={handleChange}
                required
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="category">Category*</label>
              <select
                id="category"
                name="category"
                className={`form-control ${errors.category ? 'is-invalid' : ''}`}
                value={product.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map(category => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              {errors.category && <div className="invalid-feedback">{errors.category}</div>}
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Short Description*</label>
            <textarea
              id="description"
              name="description"
              className={`form-control ${errors.description ? 'is-invalid' : ''}`}
              value={product.description}
              onChange={handleChange}
              rows="3"
              required
            ></textarea>
            {errors.description && <div className="invalid-feedback">{errors.description}</div>}
          </div>
          
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="price">Regular Price*</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="price"
                  name="price"
                  className={`form-control ${errors.price ? 'is-invalid' : ''}`}
                  value={product.price}
                  onChange={handleChange}
                  required
                />
                {errors.price && <div className="invalid-feedback">{errors.price}</div>}
              </div>
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="salePrice">Sale Price</label>
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">$</span>
                </div>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="salePrice"
                  name="salePrice"
                  className={`form-control ${errors.salePrice ? 'is-invalid' : ''}`}
                  value={product.salePrice}
                  onChange={handleChange}
                />
                {errors.salePrice && <div className="invalid-feedback">{errors.salePrice}</div>}
              </div>
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="stock">Stock Quantity*</label>
              <input
                type="number"
                min="0"
                id="stock"
                name="stock"
                className={`form-control ${errors.stock ? 'is-invalid' : ''}`}
                value={product.stock}
                onChange={handleChange}
                required
              />
              {errors.stock && <div className="invalid-feedback">{errors.stock}</div>}
            </div>
            
            <div className="form-group col-md-6">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                className="form-control"
                value={product.status}
                onChange={handleChange}
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
          
          <div className="form-check mb-3">
            <input
              type="checkbox"
              id="featured"
              name="featured"
              className="form-check-input"
              checked={product.featured}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="featured">
              Featured Product
            </label>
          </div>
        </div>
        
        {/* Details Tab */}
        <div className={`tab-content ${activeTab === 'details' ? 'active' : ''}`}>
          <div className="form-group">
            <label htmlFor="detailedDescription">Detailed Description</label>
            <ReactQuill
              value={product.detailedDescription || ''}
              onChange={handleDescriptionChange}
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                  ['link', 'image'],
                  ['clean']
                ]
              }}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="materials">Materials</label>
            <input
              type="text"
              id="materials"
              className="form-control"
              placeholder="Enter materials separated by commas (e.g., Wood, Metal, Glass)"
              value={product.materials ? product.materials.join(', ') : ''}
              onChange={(e) => handleArrayFieldChange('materials', e.target.value)}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="colors">Colors</label>
            <input
              type="text"
              id="colors"
              className="form-control"
              placeholder="Enter colors separated by commas (e.g., Black, White, Brown)"
              value={product.colors ? product.colors.join(', ') : ''}
              onChange={(e) => handleArrayFieldChange('colors', e.target.value)}
            />
          </div>
          
          <div className="dimensions-container">
            <h4>Dimensions</h4>
            <div className="form-row">
              <div className="form-group col-md-3">
                <label htmlFor="dimensions.length">Length</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="dimensions.length"
                  name="dimensions.length"
                  className={`form-control ${errors['dimensions.length'] ? 'is-invalid' : ''}`}
                  value={product.dimensions?.length || ''}
                  onChange={handleChange}
                />
                {errors['dimensions.length'] && <div className="invalid-feedback">{errors['dimensions.length']}</div>}
              </div>
              
              <div className="form-group col-md-3">
                <label htmlFor="dimensions.width">Width</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="dimensions.width"
                  name="dimensions.width"
                  className={`form-control ${errors['dimensions.width'] ? 'is-invalid' : ''}`}
                  value={product.dimensions?.width || ''}
                  onChange={handleChange}
                />
                {errors['dimensions.width'] && <div className="invalid-feedback">{errors['dimensions.width']}</div>}
              </div>
              
              <div className="form-group col-md-3">
                <label htmlFor="dimensions.height">Height</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  id="dimensions.height"
                  name="dimensions.height"
                  className={`form-control ${errors['dimensions.height'] ? 'is-invalid' : ''}`}
                  value={product.dimensions?.height || ''}
                  onChange={handleChange}
                />
                {errors['dimensions.height'] && <div className="invalid-feedback">{errors['dimensions.height']}</div>}
              </div>
              
              <div className="form-group col-md-3">
                <label htmlFor="dimensions.unit">Unit</label>
                <select
                  id="dimensions.unit"
                  name="dimensions.unit"
                  className="form-control"
                  value={product.dimensions?.unit || 'cm'}
                  onChange={handleChange}
                >
                  <option value="cm">Centimeters (cm)</option>
                  <option value="inch">Inches (in)</option>
                  <option value="feet">Feet (ft)</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        
        {/* Images Tab */}
        <div className={`tab-content ${activeTab === 'images' ? 'active' : ''}`}>
          <div className="image-upload-container">
            <div className="upload-box">
              <input
                type="file"
                id="imageUpload"
                ref={fileInputRef}
                accept="image/*"
                multiple
                onChange={handleImageSelect}
                style={{ display: 'none' }}
              />
              <button 
                type="button" 
                className="upload-btn"
                onClick={handleImageButtonClick}
              >
                <i className="fas fa-cloud-upload-alt"></i>
                <span>Upload Images</span>
              </button>
              <p className="upload-hint">Drag & drop images or click to browse</p>
            </div>
            
            {selectedImages.length > 0 && (
              <div className="image-preview-container">
                <h4>Selected Images</h4>
                <div className="image-grid">
                  {selectedImages.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={image} alt={`Preview ${index + 1}`} />
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Show existing product images if editing */}
            {product.images && product.images.length > 0 && (
              <div className="existing-images-container">
                <h4>Existing Images</h4>
                <div className="image-grid">
                  {product.images.map((image, index) => (
                    <div key={`existing-${index}`} className="image-preview-item">
                      <img src={image} alt={`Product ${index + 1}`} />
                      {/* Option to remove existing images could be added here */}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Category Specific Tab */}
        <div className={`tab-content ${activeTab === 'category-specific' ? 'active' : ''}`}>
          {product.category ? (
            renderCategorySpecificFields()
          ) : (
            <div className="alert alert-info">Please select a product category in the General tab first.</div>
          )}
        </div>
        
        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                <span className="ml-2">Saving...</span>
              </>
            ) : (
              buttonText
            )}
          </button>
          <Link to="/admin/products" className="btn btn-secondary ml-2">Cancel</Link>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;