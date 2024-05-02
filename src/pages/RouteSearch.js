// import React, { useRef, useState } from "react";
// import { RxHamburgerMenu } from "react-icons/rx";
// import Footer from "../components/footer";
// import { IoSendOutline } from "react-icons/io5";
// import "./App.css";
// import {
//   useJsApiLoader,
//   Autocomplete,
//   DirectionsRenderer,
// } from "@react-google-maps/api";
// import { Map, Marker } from "google-maps-react";

// const libraries = ["places"];

// function RouteSearch() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [directions, setDirections] = useState(null);
//   const [distance, setDistance] = useState("");
//   const [duration, setDuration] = useState("");
//   const originRef = useRef();
//   const destinationRef = useRef();

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: "AIzaSyAIFotLNmMCHhXxIuLYauCclHTxHH12p_E",
//     libraries,
//   });

//   if (!isLoaded) {
//     return <div>Loading...</div>;
//   }

//   async function routeCalculation() {
//     if (originRef.current.value === "" && destinationRef.current.value === "") {
//       return;
//     }
//     const DirectionsService = new window.google.maps.DirectionsService();
//     const response = await DirectionsService.route({
//       origin: originRef.current.value,
//       destination: destinationRef.current.value,
//       travelMode: window.google.maps.TravelMode.DRIVING,
//     });
//     setDirections(response);
//     setDistance(response.routes[0].legs[0].distance.text);
//     setDuration(response.routes[0].legs[0].duration.text);
//   }
//   const center = { lat: -1.939826787816454, lng: 30.0445426438232 };
//   return (
//     <>
//       <header>
//         <RxHamburgerMenu
//           id="menu-icon"
//           className={isMenuOpen ? "close-icon" : ""}
//           onClick={toggleMenu}
//           style={{ fontSize: "2rem", cursor: "pointer", color: "#fff" }}
//         />
//         <div className="search-route">
//           <Autocomplete>
//             <input
//               type="text"
//               placeholder="Enter your start Station"
//               ref={originRef}
//             />
//           </Autocomplete>
//           <Autocomplete>
//             <input
//               type="text"
//               placeholder="Enter your Stop Station"
//               ref={destinationRef}
//             />
//           </Autocomplete>
//           <IoSendOutline
//             onClick={routeCalculation}
//             style={{ fontSize: "2rem", color: "#fff", width: "10%" }}
//           />
//         </div>
//       </header>
//       <div className={`ride-info-popup ${isMenuOpen ? "open" : ""}`}>
//         <h4>
//           Nyabugogo -{" "}
//           {destinationRef.current ? destinationRef.current.value : ""}
//         </h4>
//         <div className="ride-info ride-details">
//           <p>
//             Distance: <span>{distance}</span>
//           </p>
//           <p>
//             Time: <span>{duration}</span>
//           </p>
//         </div>
//       </div>
//       <div className="map">
//         <Map
//           google={window.google}
//           center={center}
//           zoom={11}
//           mapContainerStyle={{ width: "100%", height: "100%" }}
//           mapTypeControl={false}
//           fullscreenControl={false}
//           zoomControl={true}
//           streetViewControl={false}
//         >
//           <Marker position={center} />
//           {directions && <DirectionsRenderer directions={directions} />}
//         </Map>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default RouteSearch;

import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Footer from "../components/footer";
import { IoSendOutline } from "react-icons/io5";
import { useJsApiLoader, DirectionsRenderer } from "@react-google-maps/api";
import { Map, Marker } from "google-maps-react";

const libraries = ["places"];

// Define your waypoints

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
  const [destination, setDestination] = useState("");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAIFotLNmMCHhXxIuLYauCclHTxHH12p_E",
    libraries,
  });

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  async function routeCalculation() {
    if (!destination) {
      return;
    }
    const DirectionsService = new window.google.maps.DirectionsService();
    const response = await DirectionsService.route({
      origin: waypoints[0].location,
      destination: waypoints.find((wp) => wp.name === destination).location,
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirections(response);
    setDistance(response.routes[0].legs[0].distance.text);
    setDuration(response.routes[0].legs[0].duration.text);
  }
  const center = waypoints[0].location;
  return (
    <>
      <header>
        <RxHamburgerMenu
          onClick={toggleMenu}
          style={{ fontSize: "2rem", cursor: "pointer", color: "#fff" }}
        />
        <div className="search-route">
          <div className="Destinations">
            <input type="text" value={waypoints[0].name} readOnly />
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              style={{
                width: "90%",
                padding: "10px",
                fontSize: "1rem",
                border: "none",
                borderRadius: "3px",
                outline: "none",
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
            onClick={routeCalculation}
            style={{
              fontSize: "2rem",
              color: "#fff",
              marginLeft: "20px",
            }}
          />
        </div>
      </header>
      <div className={`ride-info-popup ${isMenuOpen ? "open" : ""}`}>
        <h4>Nyabugogo - {destination}</h4>
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
          center={center}
          zoom={11}
          mapContainerStyle={{ width: "100%", height: "100%" }}
          mapTypeControl={false}
          fullscreenControl={false}
          zoomControl={true}
          streetViewControl={false}
        >
          <Marker position={center} />
          {directions && <DirectionsRenderer directions={directions} />}
        </Map>
      </div>
      <Footer />
    </>
  );
}

export default RouteSearch;
