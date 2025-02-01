import React from 'react';
import { Link } from 'react-router-dom';
import"./Searchreasults.css"

const SearchResults = ({ results }) => {
  return (
    <div className="search-results">
      {results.map((item) => (
        <Link
          key={item.id.videoId}
          to={`/video/${item.snippet.categoryId}/${item.id.videoId}`}
          className="search-result-item"
        >
          <img
            src={item.snippet.thumbnails.medium.url}
            alt={item.snippet.title}
          />
          <div className="search-result-info">
            <h4>{item.snippet.title}</h4>
            <p>{item.snippet.channelTitle}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SearchResults;
