// filter.tsx

import React from "react";
import "./Filter.css";

const Filter = () => {
  return (
    <div className="bubble-element Group baTaKtaP bubble-r-container flex column">
      <div className="bubble-element Group baTaKws0 bubble-r-container relative">
        <div className="bubble-element Group baTaKtt bubble-r-container flex row">
          <div className="bubble-element Text baTaLaZaL">Filters</div>
          <select className="bubble-element Dropdown dropdown-chevron">
            <option
              value="PLACEHOLDER_1427118222253"
              className="dropdown-choice dropdown-placeholder"
              style={{ display: "none" }}
            >
              Location
            </option>
            <option
              value="BLANK_1427118194589"
              className="dropdown-choice"
            ></option>
            <option value="Atlanta" className="dropdown-choice">
              Atlanta
            </option>
            <option value="Miami" className="dropdown-choice">
              Miami
            </option>
            <option value="Nashville" className="dropdown-choice">
              Nashville
            </option>
          </select>
          <select className="bubble-element Dropdown dropdown-chevron">
            <option
              value="PLACEHOLDER_1427118222253"
              className="dropdown-choice dropdown-placeholder"
              style={{ display: "none" }}
            >
              Price
            </option>
            <option
              value="BLANK_1427118194589"
              className="dropdown-choice"
            ></option>
            <option value="_0__100k" className="dropdown-choice">
              $0-$100k
            </option>
            <option value="_150__250k" className="dropdown-choice">
              $150k-$250k
            </option>
            <option value="_250__500k" className="dropdown-choice">
              $250-$500k
            </option>
            <option value="_500k__1m" className="dropdown-choice">
              $500k-$1M
            </option>
            <option value="_1m_" className="dropdown-choice">
              $1M+
            </option>
          </select>
          <select className="bubble-element Dropdown dropdown-chevron">
            <option
              value="PLACEHOLDER_1427118222253"
              className="dropdown-choice dropdown-placeholder"
              style={{ display: "none" }}
            >
              Beds
            </option>
            <option
              value="BLANK_1427118194589"
              className="dropdown-choice"
            ></option>
            <option value="1_" className="dropdown-choice">
              1
            </option>
            <option value="2_" className="dropdown-choice">
              2
            </option>
            <option value="3_" className="dropdown-choice">
              3
            </option>
            <option value="4_" className="dropdown-choice">
              4
            </option>
            <option value="5_" className="dropdown-choice">
              5
            </option>
          </select>
          <select className="bubble-element Dropdown dropdown-chevron">
            <option
              value="PLACEHOLDER_1427118222253"
              className="dropdown-choice dropdown-placeholder"
              style={{ display: "none" }}
            >
              Baths
            </option>
            <option
              value="BLANK_1427118194589"
              className="dropdown-choice"
            ></option>
            <option value="1_" className="dropdown-choice">
              1
            </option>
            <option value="2_" className="dropdown-choice">
              2
            </option>
            <option value="3_" className="dropdown-choice">
              3
            </option>
            <option value="4_" className="dropdown-choice">
              4
            </option>
          </select>
          <button className="clickable-element bubble-element Button baTaKuh">
            Search
          </button>
          <div className="bubble-element Text baTaLaZaR clickable-element">
            Reset
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
