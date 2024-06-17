
import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you have a CSS file for styling

function App() {
  const [url, setUrl] = useState('');
  const [scrapedData, setScrapedData] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.get("http://localhost:4000/scrape?url=https://www.airbnb.co.in/");
      setScrapedData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      alert('Failed to fetch scraped data. Check console for details.');
    }
  };

  return (
    <div className="App">
      <h1>Web Scraping Example with React</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="urlInput">Enter URL to Scrape:</label>
        <input
          type="text"
          id="urlInput"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit">Scrape Data</button>
      </form>

      {scrapedData && (
        <div className="scraped-data">
          <h2>Scraped Data</h2>
          <p><strong>Name:</strong> {scrapedData.name}</p>
          <p><strong>Description:</strong> {scrapedData.description}</p>
          {scrapedData.logo && (
            <p><strong>Company Logo:</strong> <img src={scrapedData.logo} alt="Company Logo" /></p>
          )}
          <p><strong>Address:</strong> {scrapedData.address}</p>
          <p><strong>Phone:</strong> {scrapedData.phone}</p>
          <p><strong>Email:</strong> {scrapedData.email}</p>

          {/* Social Media Links with Icons */}
          <div className="social-links">
            {scrapedData.facebook && (
              <a href={scrapedData.facebook} target="_blank" rel="noopener noreferrer">
                <img src="/icons/facebook.png" alt="Facebook" className="social-icon" />
              </a>
            )}
            {scrapedData.linkedin && (
              <a href={scrapedData.linkedin} target="_blank" rel="noopener noreferrer">
                <img src="/icons/linkedin.png" alt="LinkedIn" className="social-icon" />
              </a>
            )}
            {scrapedData.twitter && (
              <a href={scrapedData.twitter} target="_blank" rel="noopener noreferrer">
                <img src="/icons/twitter.png" alt="Twitter" className="social-icon" />
              </a>
            )}
            {scrapedData.instagram && (
              <a href={scrapedData.instagram} target="_blank" rel="noopener noreferrer">
                <img src="/icons/instagram.png" alt="Instagram" className="social-icon" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;