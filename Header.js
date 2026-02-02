import React from 'react';
import './Header.css';

const Header = ({ onCategorySelect, selectedCategory }) => {
  const categories = ['All', 'Local', 'Politics', 'Sports', 'Entertainment'];

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>Local News Network</h1>
            <p className="tagline">Bringing you the latest from our community</p>
          </div>
          
          <nav className="navbar">
            <ul className="nav-list">
              {categories.map((category) => (
                <li key={category} className="nav-item">
                  <button
                    className={`nav-link ${selectedCategory === category ? 'active' : ''}`}
                    onClick={() => onCategorySelect(category)}
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;