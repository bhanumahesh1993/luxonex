import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminHome from './AdminHome';
import ProductList from './products/ProductList';
import ProductEdit from './products/ProductEdit';
import ProductCreate from './products/ProductCreate';
import OrdersList from './orders/OrdersList';
import OrderDetail from './orders/OrderDetail';
import CustomersList from './customers/CustomersList';
import CustomerDetail from './customers/CustomerDetail';
import CategoryManagement from './categories/CategoryManagement';
import Settings from './settings/Settings';
import './AdminDashboard.scss';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  useEffect(() => {
    // Check if user is admin
    if (!user || user.role !== 'admin') {
      navigate('/login', { 
        state: { from: location, message: 'You must be logged in as an admin to access this page.' } 
      });
    }
  }, [user, navigate, location]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  if (!user || user.role !== 'admin') {
    return null; // Don't render anything if not admin
  }
  
  return (
    <div className={`admin-dashboard ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <AdminSidebar isOpen={sidebarOpen} />
      
      <div className="admin-main">
        <AdminHeader 
          toggleSidebar={toggleSidebar} 
          user={user} 
          logout={logout} 
        />
        
        <div className="admin-content">
          <Routes>
            <Route path="/" element={<AdminHome />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/products/create" element={<ProductCreate />} />
            <Route path="/products/edit/:productId" element={<ProductEdit />} />
            <Route path="/orders" element={<OrdersList />} />
            <Route path="/orders/:orderId" element={<OrderDetail />} />
            <Route path="/customers" element={<CustomersList />} />
            <Route path="/customers/:customerId" element={<CustomerDetail />} />
            <Route path="/categories" element={<CategoryManagement />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;