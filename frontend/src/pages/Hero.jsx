import React, { useState } from "react";
import "../stylesheets/Hero.css";
import { useNavigate } from "react-router-dom";

const Hero = () => {

  const navigate = useNavigate();

  const [searchText, setSearchText] =
    useState("");

  const [locationText, setLocationText] =
    useState("");

  // =========================
  // HANDLE SEARCH
  // =========================

  const handleSearch = () => {

    navigate(
      `/search-results?query=${searchText}&location=${locationText}`
    );
  };

  return (

    <section className="hero">

      <div className="overlay"></div>

      <div className="hero-content">

        <h1>
          Find Your Lost Items Quickly
        </h1>

        <p>
          Search for lost and found items
          near you and reconnect people
          with their belongings.
        </p>

        {/* SEARCH */}

        <div className="hero-search-wrapper">

          <div className="hero-search">

            {/* ITEM */}

            <input
              type="text"
              placeholder="What did you lose?"
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

            {/* LOCATION */}

            <input
              type="text"
              placeholder="Enter location"
              value={locationText}
              onChange={(e) =>
                setLocationText(e.target.value)
              }
            />

            {/* BUTTON */}

            <button
              className="searchBtn"
              onClick={handleSearch}
            >
              Search
            </button>

          </div>

        </div>

      </div>

    </section>
  );
};

export default Hero;