// App.js
import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Footer from "../components/footer";
import MapView from "../components/MapView";

import "./App.css";

function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [duration, setDuration] = useState(null);
  const [distance, setDistance] = useState(null);
  const [currentStopIndex, setCurrentStopIndex] = useState(0);
  const [isRideStarted, setIsRideStarted] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const startRide = () => {
    setIsRideStarted(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      (error) => console.log(error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const stopRide = () => {
    setIsRideStarted(false);
    setCurrentLocation(null);
    setDuration(null);
    setDistance(null);
    setCurrentStopIndex(0);
  };

  return (
    <>
      <header>
        <RxHamburgerMenu
          id="menu-icon"
          className={isMenuOpen ? "close-icon" : ""}
          onClick={toggleMenu}
          style={{ fontSize: "2rem", cursor: "pointer", color: "#fff" }}
        />
        <h2 className="Logo">Startup</h2>
      </header>
      <div className={`ride-info-popup ${isMenuOpen ? "open" : ""}`}>
        <h4>Nyabugogo - Kimironko</h4>
        <p>
          Next stop:{" "}
          <span>
            {currentStopIndex < 6
              ? `Stop ${String.fromCharCode(65 + currentStopIndex)}`
              : "Kimironko"}
          </span>
        </p>
        <div className="ride-info">
          <p>
            Distance: <span>{distance}</span>
          </p>
          <p>
            Time: <span>{duration}</span>
          </p>
        </div>
        <div className="ride-start-btn">
          <button
            className="btn"
            onClick={isRideStarted ? stopRide : startRide}
          >
            {isRideStarted ? "Stop Ride" : "Start Ride"}
          </button>
        </div>
      </div>
      <div className="map">
        <MapView
          currentLocation={currentLocation}
          setDuration={setDuration}
          setDistance={setDistance}
          setCurrentStopIndex={setCurrentStopIndex}
          currentStopIndex={currentStopIndex}
        />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
