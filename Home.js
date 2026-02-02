import React from 'react';
import ArticleCard from './ArticleCard';
import './Home.css';

const Home = ({ articles, selectedCategory }) => {
  // Group articles by category for display
  const groupArticlesByCategory = (articles) => {
    const grouped = {};
    
    articles.forEach(article => {
      if (!grouped[article.category]) {
        grouped[article.category] = [];
      }
      grouped[article.category].push(article);
    });
    
    return grouped;
  };

  const groupedArticles = groupArticlesByCategory(articles);

  return (
    <div className="home">
      <div className="page-header">
        <h1 className="page-title">
          {selectedCategory === 'All' ? 'Latest News' : `${selectedCategory} News`}
        </h1>
        <p className="page-subtitle">
          {selectedCategory === 'All' 
            ? 'Stay updated with the latest stories from our community' 
            : `Latest stories in ${selectedCategory.toLowerCase()}`
          }
        </p>
      </div>

      {selectedCategory === 'All' ? (
        // Display grouped by category
        Object.keys(groupedArticles).map((category) => (
          <section key={category} className="category-section">
            <h2 className="category-title">
              <span className="category-icon">
                {category === 'Local' && '🏠'}
                {category === 'Politics' && '🏛️'}
                {category === 'Sports' && '⚽'}
                {category === 'Entertainment' && '🎭'}
              </span>
              {category}
            </h2>
            <div className="articles-grid">
              {groupedArticles[category].map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>
          </section>
        ))
      ) : (
        // Display all articles for selected category
        <section className="category-section">
          <div className="articles-grid">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          
          {articles.length === 0 && (
            <div className="no-articles">
              <h3>No articles found in {selectedCategory} category</h3>
              <p>Check back later for new stories!</p>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Home;