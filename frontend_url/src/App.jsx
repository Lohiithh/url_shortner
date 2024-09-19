import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [longUrl, setLongUrl] = useState(''); // Bind input field
  const [shortUrl, setShortUrl] = useState(''); // Store the returned short URL

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/shorten', { originalUrl: longUrl });
      setShortUrl(response.data.shortUrl); // Update the short URL state
    } catch (error) {
      console.error('Error sending POST request to the server', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-gray-200">
      <h2 className="text-center text-gray-400 p-102 mb-4 max-w-2xl leading-relaxed">
        Streamline your links with our easy-to-use URL shortener. Enter a long URL, and we'll generate a compact, shareable link that redirects instantly to your original page. Perfect for sharing on social media, emails, and more!
      </h2>
      <h1 className="text-5xl font-extrabold mb-8 text-white">URL Shortener</h1>

      <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
        {/* Input Field for Long URL */}
        <input
          type="text"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)} // Update state on input change
          placeholder="Enter your URL"
          className="w-full p-3 border border-gray-600 bg-gray-700 rounded mb-6 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
        />

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition duration-300 transform hover:scale-105"
        >
          Get a Short URL
        </button>

        {/* Display Short URL */}
        {shortUrl && (
          <div className="mt-6 text-center">
            <p className="text-green-400 font-semibold text-lg">Short URL:</p>
            <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-400 font-bold underline hover:text-blue-500 transition duration-300">
              {shortUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
