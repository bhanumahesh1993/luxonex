import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import logo from "../../images/logo.jpeg";
import "./Header.scss";

const Header = () => {
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
  const { wishlist } = useWishlist();
  const [showMegaMenu, setShowMegaMenu] = useState(false);

  return (
    <header className="header rc-header">
      <div className="rc-header-bar">
        <div className="rc-header-left">
          <button className="rc-search-btn" aria-label="Search">
            <span className="rc-search-icon">🔍</span>
            <span className="rc-search-text">SEARCH</span>
          </button>
        </div>
        <div className="rc-header-center">
          <Link to="/" className="rc-logo-link">
            <img src={logo} alt="LuxOneX" className="rc-logo-img" />
            <span className="rc-logo-text">LUXONEX</span>
          </Link>
        </div>
        <div className="rc-header-right">
          <span className="rc-header-country">USA</span>
          <Link to="/profile" className="rc-header-icon" aria-label="User">
            <i className="fas fa-user"></i>
          </Link>
          <Link to="/cart" className="rc-header-icon" aria-label="Cart">
            <i className="fas fa-shopping-bag"></i>
            <span className="rc-cart-count">{getCartCount()}</span>
          </Link>
        </div>
      </div>
      <nav className="rc-nav">
        <ul className="rc-nav-list">
          <li
            className="rc-nav-item"
            onMouseEnter={() => setShowMegaMenu(true)}
            onMouseLeave={() => setShowMegaMenu(false)}
          >
            <span className="rc-nav-link rc-nav-link-shop">SHOP</span>
            {showMegaMenu && (
              <div className="rc-mega-menu">
                <div className="rc-mega-menu-content">
                  <div>
                    <b>New Arrivals</b>
                    <br />
                    Original Designs
                  </div>
                  <div>
                    <b>Living Room</b>
                    <br />
                    Sofas
                    <br />
                    Sectionals
                    <br />
                    Sleeper Sofas
                    <br />
                    Modular Sectionals
                    <br />
                    Lounge & Armchairs
                    <br />
                    Coffee Tables
                    <br />
                    Side Tables
                    <br />
                    TV Stands
                    <br />
                    Credenzas
                    <br />
                    Benches & Ottomans
                    <br />
                    Book Shelves
                  </div>
                  <div>
                    <b>Bedroom</b>
                    <br />
                    Beds
                    <br />
                    Modular Beds
                    <br />
                    Nightstands
                    <br />
                    Dressers
                    <br />
                    Bedding
                  </div>
                  <div>
                    <b>Dining & Kitchen</b>
                    <br />
                    Dining Tables
                    <br />
                    Dining & Side Chairs
                    <br />
                    Bar & Counter Stools
                    <br />
                    Sideboards
                  </div>
                  <div>
                    <b>Outdoor</b>
                    <br />
                    Outdoor Dining Chairs
                    <br />
                    Outdoor Lounge Chairs
                    <br />
                    Outdoor Tables
                    <br />
                    Outdoor Modulars
                    <br />
                    Outdoor Lounger & Daybeds
                    <br />
                    Outdoor Accessories
                  </div>
                  <div>
                    <b>Office</b>
                    <br />
                    Office Desks
                    <br />
                    Office Chairs
                    <br />
                    Office Storage
                    <br />
                    Book Shelves
                  </div>
                  <div>
                    <b>Decor</b>
                    <br />
                    Rugs & Poufs
                    <br />
                    Lighting
                    <br />
                    Mirrors
                    <br />
                    Pillows
                  </div>
                  <div>
                    <b>Collections</b>
                    <br />
                    John Legend Journeys
                    <br />
                    The Oppenheim Group
                    <br />
                    The Maria Collection
                    <br />
                    Black Label
                  </div>
                </div>
              </div>
            )}
          </li>
          <li className="rc-nav-item">
            <span className="rc-nav-link">INSPIRATION</span>
          </li>
          <li className="rc-nav-item">
            <span className="rc-nav-link">DISCOVER</span>
          </li>
          <li className="rc-nav-item">
            <span className="rc-nav-link">SHOWROOM</span>
          </li>
          <li className="rc-nav-item">
            <span className="rc-nav-link rc-nav-link-sale">SALE</span>
          </li>
          <li className="rc-nav-item">
            <span className="rc-nav-link">TRADE</span>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
