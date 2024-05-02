import React, { useEffect, useState } from "react";
import { Map, Marker, GoogleApiWrapper, Polyline } from "google-maps-react";

const MapView = ({
  google,
  currentLocation,
  setDuration,
  setDistance,
  setCurrentStopIndex,
  currentStopIndex,
}) => {
  const mapStyles = {
    width: "100%",
    height: "100%",
  };

  const [directions, setDirections] = useState(null);

  let waypoints = [
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

  let nextStop = waypoints[currentStopIndex].location;

  useEffect(() => {
    if (currentLocation) {
      const DirectionsService = new google.maps.DirectionsService();
      const DistanceMatrixService = new google.maps.DistanceMatrixService();

      DirectionsService.route(
        {
          origin: waypoints[0].location,
          destination: waypoints[waypoints.length - 1].location,
          waypoints: waypoints.slice(1, -1).map((waypoint) => ({
            location: waypoint.location,
            stopover: true,
          })),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        }
      );

      DistanceMatrixService.getDistanceMatrix(
        {
          origins: [currentLocation],
          destinations: [nextStop],
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status !== "OK") {
            alert("Error was: " + status);
          } else {
            let duration = response.rows[0].elements[0].duration.text;
            let distance = response.rows[0].elements[0].distance.text;
            setDuration(duration);
            setDistance(distance);
            if (distance === "1 m") {
              setCurrentStopIndex(currentStopIndex + 1);
            }
          }
        }
      );
    }
  }, [currentLocation]);

  return (
    <>
      <Map
        google={window.google}
        zoom={11}
        style={mapStyles}
        initialCenter={waypoints[0].location}
        mapTypeControl={false}
        fullscreenControl={false}
        zoomControl={true}
        streetViewControl={false}
      >
        {currentLocation && <Marker position={currentLocation} />}
        {waypoints.map((waypoint, index) => (
          <Marker
            key={index}
            position={waypoint.location}
            label={waypoint.name}
          />
        ))}
        <Polyline
          path={waypoints.map((waypoint) => waypoint.location)}
          strokeColor="blue"
          strokeOpacity={0.6}
          strokeWeight={10}
        />
      </Map>
    </>
  );
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyAIFotLNmMCHhXxIuLYauCclHTxHH12p_E", //just in case of testing because soon it is going to be deleted
})(MapView);
