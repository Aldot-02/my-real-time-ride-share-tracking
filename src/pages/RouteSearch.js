import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Footer from "../components/footer";
import { IoSendOutline } from "react-icons/io5";
import { useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import { Map, Marker, Polyline } from "google-maps-react";

const libraries = ["places"];

const waypoints = [
  {
    name: "Nyabugogo",
    location: { lat: -1.939826787816454, lng: 30.0445426438232 },
  },
  {
    name: "Stop A",
    location: { lat: -1.9355377074007851, lng: 30.060163829002217 },
  },
  {
    name: "Stop B",
    location: { lat: -1.9358808342336546, lng: 30.08024820994666 },
  },
  {
    name: "Stop C",
    location: { lat: -1.9489196023037583, lng: 30.092607828989397 },
  },
  {
    name: "Stop D",
    location: { lat: -1.9592132952818164, lng: 30.106684061788073 },
  },
  {
    name: "Stop E",
    location: { lat: -1.9487480402200394, lng: 30.126596781356923 },
  },
  {
    name: "Kimironko",
    location: { lat: -1.9365670876910166, lng: 30.13020167024439 },
  },
];

function RouteSearch() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [startLocation, setStartLocation] = useState("");
  const [destination, setDestination] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAIFotLNmMCHhXxIuLYauCclHTxHH12p_E", //just in case of testing because soon it is going to be deleted
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function routeCalculation() {
    if (!destination || !startLocation) {
      alert("Please select both origin and destination.");
      return;
    }
  
    const DirectionsService = new window.google.maps.DirectionsService();
    const response = await DirectionsService.route({
      origin: waypoints.find((wp) => wp.name === startLocation).location,
      destination: waypoints.find((wp) => wp.name === destination).location,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
  
    if (response.status === "OK") {
      const leg = response.routes[0].legs[0];
      setDistance(leg.distance.text);
      setDuration(leg.duration.text);
    } else {
      console.error("Directions request failed: ", response);
    }
  
    setDirections(response);
  }

  return (
    <>
      <header>
        <RxHamburgerMenu
          onClick={toggleMenu}
          style={{ fontSize: "2rem", cursor: "pointer", color: "#fff" }}
        />
        <div className="search-route">
          <div className="Destinations">
            <select
              value={startLocation}
              onChange={(e) => setStartLocation(e.target.value)}
              style={{
                width: "45%",
                padding: "7px 10px",
                fontSize: "1rem",
                border: "none",
                borderRadius: "3px",
                outline: "none",
                marginLeft: "10px",
              }}
            >
              <option value="">Select origin</option>
              {waypoints.map((wp, index) => (
                <option key={index} value={wp.name}>
                  {wp.name}
                </option>
              ))}
            </select>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{
                width: "45%",
                padding: "7px 10px",
                fontSize: "1rem",
                border: "none",
                borderRadius: "3px",
                outline: "none",
                marginLeft: "7px",
              }}
            >
              <option value="">Select destination</option>
              {waypoints.slice(1).map((wp, index) => (
                <option key={index} value={wp.name}>
                  {wp.name}
                </option>
              ))}
            </select>
          </div>
          <IoSendOutline
          className="send-icon"
            onClick={routeCalculation}
            style={{
              fontSize: "2rem",
              color: "#fff",
              cursor: "pointer"
            }}
          />
        </div>
      </header>
      <div className={`ride-info-popup ${isMenuOpen ? "open" : ""}`}>
        <h4>{startLocation ? startLocation : "Origin"} - {destination ? destination : "Destination"}</h4>
        <div className="ride-info ride-details">
          <p>
            Distance: <span>{distance}</span>
          </p>
          <p>
            Time: <span>{duration}</span>
          </p>
        </div>
      </div>
      <div className="map">
        <Map
          google={window.google}
          center={waypoints[0].location}
          zoom={11}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          mapTypeControl={false}
          fullscreenControl={false}
          zoomControl={true}
          streetViewControl={false}
        >
          {startLocation && <Marker position={waypoints.find((wp) => wp.name === startLocation).location} label="Start" />}
          {destination && <Marker position={waypoints.find((wp) => wp.name === destination).location} label="Destination" />}
          {directions && <DirectionsRenderer directions={directions} />}
          <Polyline
          path={waypoints.map((wp) => wp.location)}
          strokeColor="blue"
          strokeOpacity={0.6}
          strokeWeight={10}
        />
        </Map>
      </div>
      <Footer />
    </>
  );
}

export default RouteSearch;
