import "./TabsContainer.css";
import "leaflet/dist/leaflet.css";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";

import L from "leaflet";
import data from "../data/data.json";

delete L.Icon.Default.prototype._getIconUrl;
// `delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });`

// L.Icon.Default.imagePath='img/'

const marker = new L.Icon({
  iconUrl: "../../assets/map.svg",
  iconSize: [25, 25],
});

class MapView extends Component {
    state={
        isActive: null
    }
  render() {
    return (
      <MapContainer className="map" center={[20.5937, 78.9629]} zoom={12}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {data.map((data) => {
          return (
            <Marker position={[data.lat, data.long]} icon={marker}>
            </Marker>
          );
        })}
        );
      </MapContainer>
    );
  }
}

export default inject("dataStore")(observer(MapView));
