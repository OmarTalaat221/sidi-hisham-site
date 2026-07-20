import React from "react";
import GoogleMapReact from "google-map-react";

const Marker = (props) => {
  const { color, name, id } = props;
  return (
    <div
      className="marker"
      style={{ backgroundColor: color, cursor: "pointer" }}
      title={name}
    />
  );
};

export default function SimpleMap({ lat, lng, name, zoom }) {
  const defaultProps = {
    center: {
      lat: lat,
      lng: lng,
    },
    zoom: zoom,
  };

  return (
    <div style={{ height: "60vh", width: "100%", marginTop: "2vh" }}>
      <GoogleMapReact
        bootstrapURLKeys={{
          key: "AIzaSyCnjKmyclhtT-FiELd8oHie9ze2dlLA9Fk",
          language: "en",
        }}
        center={defaultProps.center}
        zoom={defaultProps.zoom}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          mapTypeControl: false,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false,
          gestureHandling: 'cooperative'
        }}
      >
        <Marker lat={lat} lng={lng} name={name} color="green" />
      </GoogleMapReact>
    </div>
  );
}
