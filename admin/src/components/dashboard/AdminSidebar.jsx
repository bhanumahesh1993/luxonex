import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.scss';

const AdminSidebar = ({ isOpen }) => {
  return (
    <div className={`admin-sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2>Luxeonex</h2>
        <p>Admin Panel</p>
      </div>
      
      <nav className="sidebar-nav">
        <ul>
          <li>
            <NavLink to="/admin" end>
              <i className="fas fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li className="nav-section">
            <h3>Products</h3>
            <ul>
              <li>
                <NavLink to="/admin/products">
                  <i className="fas fa-list"></i>
                  <span>All Products</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/products/create">
                  <i className="fas fa-plus"></i>
                  <span>Add New</span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/admin/categories">
                  <i className="fas fa-tags"></i>
                  <span>Categories</span>
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/admin/orders">
              <i className="fas fa-shopping-cart"></i>
              <span>Orders</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/customers">
              <i className="fas fa-users"></i>
              <span>Customers</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/settings">
              <i className="fas fa-cog"></i>
              <span>Settings</span>
            </NavLink>
          </li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <NavLink to="/" className="view-site-btn">
          <i className="fas fa-eye"></i>
          <span>View Site</span>
        </NavLink>
      </div>
    </div>
  );
};

export default AdminSidebar;