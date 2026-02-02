import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import ArticleDetail from './components/ArticleDetail';
import './App.css';

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const endpoint = selectedCategory === 'All' 
          ? '/articles' 
          : `/articles/${selectedCategory}`;
        
        const response = await fetch(endpoint);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArticles(data);
      } catch (err) {
        console.error('Error fetching articles:', err);
        setError('Failed to load articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [selectedCategory]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <Router>
      <div className="App">
        <Header onCategorySelect={handleCategorySelect} selectedCategory={selectedCategory} />
        <main className="container">
          <Routes>
            <Route path="/" element={
              loading ? (
                <div className="loading">Loading articles...</div>
              ) : error ? (
                <div className="error">{error}</div>
              ) : (
                <Home articles={articles} selectedCategory={selectedCategory} />
              )
            } />
            <Route path="/article/:id" element={<ArticleDetail />} />
          </Routes>
        </main>
        <footer className="footer">
          <div className="container">
            <p>&copy; {new Date().getFullYear()} Local News Network. All rights reserved.</p>
            <p>Bringing you the latest news from our community.</p>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;