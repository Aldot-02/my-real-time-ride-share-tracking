<h1>Real Time Ride Share App</h1>

<h3 align="center"><a>twizald.02@gmail.com</a> - Google Maps Api</h3>

![demo](/ride-share.png)

## 🚨 Project Overview

This project aims to develop a real-time ride-share tracking web application for a transportation agency operating in Kigali, Rwanda. The app enables drivers to navigate a predefined route from Nyabugogo to Kimironko, with five intermediate stops, and provides real-time updates on the estimated time of arrival (ETA) to each stop. The app is built using React.js for the front-end and leverages the Google Maps API for mapping, routing, and location-based functionalities.

The project works on all screens

## 🚨 Project Approach

I initially created a react app, and after setting it, I went to my google cloud console api to create a new project and Enabled The necessary apis that were to be used through out the entire functionality of the app. Then, I came back to setting the routes using react router dom for navigating between the two pages on the app, one which is the home page, and the other one which is any route details finder among the stops given.

### Homepage

When displayed, it shows the navbar with logo and hamburger menu, bottom navigation and the map in between displaying all the routes from Nyabugogo to Kimironko with markers at their Location. In order to get the functionality, Click on the Hamburger menu, and their will be a beautiful animated popup with the button that the driver should click to start the journey. When it is clicked, using places api, it gets the near by stop station while watching the drivers current location, and calculates the distance and time to that station from Nyabugogo, assuming the driver is using the Driving mode, with constant speed, and from his location to the first stop. When the ride is started, there is the option to stop it with stop button, which will stop calculations and whatching the position of driver, just in case the driver is on the next stop picking up passengers, and can start again when he is done picking up new passengers.

### Route Details Page

Just planned in case the driver is curious about the distance to a random stop station from another one among the provided routes, where he/she will select among the routes  and set origin and destination to get the distance and estimated time to get there.

## 🛠 Installation & Set Up

1. Installation of the dependencies

   ```sh
   npm install //Consider using npm install --force in case you face a challenge of conflicting dependencies to access the site.
   ```

2. Start the development server

   ```sh
   npm start
   ```

## Technologies Used

1. React Js

2. Google Maps Javascript Api for getting the maps functionalities in the webpage

3. Google Maps Geolocation Api for getting the actual location of the driver along the way to Kimironko using watch position method.

4. Google Maps Places Api for calculating distances between the starting point to any other selected route in the second tab of the page

5. Google Maps DistanceMatrix Api to obtain the Estimated Arrival time of the driver from Nyabugogo to the nearby location, assuming the constant speed.

### END
