import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ArticleCard.css';

const ArticleCard = ({ article }) => {
  const navigate = useNavigate();

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

 

  // Truncate content for snippet
  const truncateContent = (content, maxLength = 150) => {
    if (content.length <= maxLength) return content;
    return content.substr(0, maxLength) + '...';
  };

  // Handle read more button click
  const handleReadMore = () => {
    // Navigate to article detail page with article data
    navigate(`/article/${article.id}`);
  };

  return (
    <article className="article-card">
      <div className="article-image">
        <img 
          src={article.image_url} 
          alt={article.title} 
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80';
          }}
        />
        <span className="category-badge">{article.category}</span>
      </div>
      
      <div className="article-content">
        <h2 className="article-title">{article.title}</h2>
        
        <div className="article-meta">
          <time className="article-date" dateTime={article.date}>
            {formatDate(article.date)}
          </time>
          <span className="article-category">{article.category}</span>
        </div>
        
        <p className="article-snippet">
          {truncateContent(article.content)}
        </p>
        
        <button className="read-more-btn" onClick={handleReadMore}>
          Read Full Story
        </button>
      </div>
    </article>
  );
};

export default ArticleCard;