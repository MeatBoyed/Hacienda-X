import React from "react";
import "./property.css"; // Import CSS file
import Rentals from "../../components/Rentals";

const PropertyPage: React.FC = () => {
  return (
    <div className="search-bar">
      {/* Location search */}
      <div className="input-group location-input">
        <label htmlFor="location">Location:</label>
        <input type="text" id="location" placeholder="Location" />
      </div>

      {/* Min Price dropdown */}
      <div className="input-group">
        <label htmlFor="min-price">Min Price:</label>
        <select id="min-price">
          <option value="">Any</option>
          <option value="100000">100,000</option>
          <option value="200000">200,000</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Max Price dropdown */}
      <div className="input-group">
        <label htmlFor="max-price">Max Price:</label>
        <select id="max-price">
          <option value="">Any</option>
          <option value="500000">500,000</option>
          <option value="1000000">1,000,000</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Bedrooms dropdown */}
      <div className="input-group">
        <label htmlFor="bedrooms">Bedrooms:</label>
        <select id="bedrooms">
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Bathrooms dropdown */}
      <div className="input-group">
        <label htmlFor="bathrooms">Bathrooms:</label>
        <select id="bathrooms">
          <option value="">Any</option>
          <option value="1">1</option>
          <option value="2">2</option>
          {/* Add more options as needed */}
        </select>
      </div>

      {/* Patio checkbox */}
      <div className="input-group">
        <input type="checkbox" id="patio" />
        <label htmlFor="patio">Patio</label>
      </div>

      {/* Search button */}
      <div className="input-group">
        <button className="button search-button">Search</button>
      </div>
      <div>
        {/* Rentals section */}
        <Rentals />
      </div>
    </div>
  );
};

export default PropertyPage;
