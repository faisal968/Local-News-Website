import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/article/${id}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        console.error('Error fetching article:', err);
        setError('Failed to load article. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchArticle();
    }
  }, [id]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleBack = () => {
    navigate(-1);
  };

  const handleHome = () => {
    navigate('/');
  };

  // Share functions
  const shareOnFacebook = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article.title} - Local News Network`);
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank', 'width=600,height=400');
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(`${article.title} - Check out this article from Local News Network`);
    const hashtags = encodeURIComponent('LocalNews,Community');
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}&hashtags=${hashtags}`, '_blank', 'width=600,height=400');
  };

  const shareViaEmail = () => {
    const subject = encodeURIComponent(`${article.title} - Local News Network`);
    const body = encodeURIComponent(`I found this interesting article and thought you might like it:\n\n${article.title}\n\n${window.location.href}\n\nRead more at Local News Network - Bringing you the latest community news.`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const copyArticleLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
  };

  if (loading) {
    return (
      <div className="article-detail">
        <div className="loading-state">
          <div className="loading-spinner"></div>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="article-detail">
        <div className="article-not-found">
          <h2>Article Not Found</h2>
          <p>{error || "The article you're looking for doesn't exist or has been removed."}</p>
          <button onClick={handleHome} className="back-btn">Go to Homepage</button>
        </div>
      </div>
    );
  }

  const wordCount = article.content.split(' ').length;
  const readTime = Math.ceil(wordCount / 200);
  const paragraphs = article.content.split('\n\n').filter(p => p.trim());

  return (
    <div className="article-detail">
      <div className="detail-header">
        <button onClick={handleBack} className="back-btn">
          ← Back to Articles
        </button>
        <button onClick={handleHome} className="home-btn">
          Home
        </button>
      </div>

      <article className="full-article">
        <div className="article-hero">
          <img 
            src={article.image_url} 
            alt={article.title}
            className="article-hero-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1588681664899-f142ff2dc9b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
            }}
          />
          <div className="article-hero-overlay">
            <span className="hero-category">{article.category}</span>
            <h1 className="article-detail-title">{article.title}</h1>
            <div className="article-detail-meta">
              <time className="article-detail-date" dateTime={article.date}>
                {formatDate(article.date)}
              </time>
              <span className="read-time">📖 {readTime} min read</span>
            </div>
          </div>
        </div>

        <div className="article-detail-content">
          <div className="content-wrapper">
            <div className="article-body">
              <div className="article-full-content">
                {paragraphs.map((paragraph, index) => (
                  <div key={index} className="content-paragraph">
                    <p>{paragraph}</p>
                    {index < paragraphs.length - 1 && <div className="paragraph-spacer"></div>}
                  </div>
                ))}
              </div>
            </div>

            <div className="article-sidebar">
              <div className="sidebar-section">
                <h3>Article Details</h3>
                <div className="detail-item">
                  <strong>Category:</strong>
                  <span className="detail-category">{article.category}</span>
                </div>
                <div className="detail-item">
                  <strong>Published:</strong>
                  <span>{formatDate(article.date)}</span>
                </div>
                <div className="detail-item">
                  <strong>Word Count:</strong>
                  <span>{wordCount} words</span>
                </div>
                <div className="detail-item">
                  <strong>Reading Time:</strong>
                  <span>{readTime} minutes</span>
                </div>
                <div className="detail-item">
                  <strong>Paragraphs:</strong>
                  <span>{paragraphs.length}</span>
                </div>
              </div>

              <div className="sidebar-section">
                <h3>Share This Article</h3>
                <div className="share-buttons">
                  <button 
                    onClick={shareOnFacebook} 
                    className="share-btn facebook"
                    title="Share on Facebook"
                  >
                    <span className="share-icon">📘</span> Facebook
                  </button>
                  <button 
                    onClick={shareOnTwitter} 
                    className="share-btn twitter"
                    title="Share on Twitter"
                  >
                    <span className="share-icon">🐦</span> Twitter
                  </button>
                  <button 
                    onClick={shareViaEmail} 
                    className="share-btn email"
                    title="Share via Email"
                  >
                    <span className="share-icon">📧</span> Email
                  </button>
                  <button 
                    onClick={copyArticleLink} 
                    className="share-btn copy-link"
                    title="Copy article link"
                  >
                    <span className="share-icon">{copied ? '✅' : '🔗'}</span> 
                    {copied ? 'Copied!' : 'Copy Link'}
                  </button>
                </div>
                
                {copied && (
                  <div className="copy-success-message">
                    ✓ Link copied to clipboard!
                  </div>
                )}
              </div>

              <div className="sidebar-section">
                <h3>More Options</h3>
                <div className="extra-options">
                  <button 
                    onClick={() => window.print()} 
                    className="extra-btn print-btn"
                  >
                    🖨️ Print Article
                  </button>
                  <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
                    className="extra-btn top-btn"
                  >
                    ↑ Back to Top
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="article-actions">
          <button onClick={handleBack} className="action-btn back">
            ← Back to Articles
          </button>
          <div className="share-mini-buttons">
            <button onClick={shareOnFacebook} className="mini-btn facebook" title="Facebook">📘</button>
            <button onClick={shareOnTwitter} className="mini-btn twitter" title="Twitter">🐦</button>
            <button onClick={shareViaEmail} className="mini-btn email" title="Email">📧</button>
            <button onClick={copyArticleLink} className="mini-btn copy" title="Copy Link">
              {copied ? '✅' : '🔗'}
            </button>
          </div>
        </div>
      </article>
    </div>
  );
};

export default ArticleDetail;