import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import { Paper, Typography, useMediaQuery } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import Rating from "@material-ui/lab/Rating";

import useStyles from "./styles";

export const Map = ({
  setBounds,
  setCoordinates,
  coordinates,
  places,
  setChildClicked,
  weatherData,
}) => {
  const { markerContainer, mapContainer, typography, paper, pointer } =
    useStyles();
  const isDesktop = useMediaQuery("(min-width:600px");

  return (
    <div className={mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          // styles: mapStyles,
        }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
        onChildClick={(child) => setChildClicked(child)}
      >
        {places &&
          places.map(({ longitude, latitude, name, photo, rating }, idx) => (
            <div
              key={idx}
              className={markerContainer}
              lat={latitude && Number(latitude)}
              lng={longitude && Number(longitude)}
            >
              {!isDesktop ? (
                <LocationOnOutlinedIcon color="primary" fontSize="large" />
              ) : (
                <Paper elevation={3} className={paper}>
                  <Typography
                    className={typography}
                    variant="subtitle2"
                    gutterBottom
                  >
                    {name}
                  </Typography>
                  <img
                    className={pointer}
                    src={
                      photo
                        ? photo.images.large.url
                        : "https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg"
                    }
                    alt={name}
                  />
                  <Rating
                    name="read-only"
                    size="small"
                    value={Number(rating)}
                    readOnly
                  />
                </Paper>
              )}
            </div>
          ))}
        {weatherData?.list?.map(({ coord, weather }, idx) => (
          <div key={idx} latitude={coord.lat} lng={coord.lon}>
            <img
              height={100}
              src={`https://openweathermap.org/img/w/${weather[0].icon}.png`}
              alt=""
            />
          </div>
        ))}
      </GoogleMapReact>
    </div>
  );
};
