import React, { Component } from 'react';

import SwipeableTemporaryDrawer from './components/SwipeableTemporaryDrawer';


import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import {getLocation} from './components/getLocation';

import breweryIconSvg from './icons/beer.svg';
import userLocationSvg from './icons/userLocation.svg';

import './App.css';

const openMapTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const breweryIcon = L.icon({
  iconUrl: breweryIconSvg,
  iconSize: [50, 82]
});

const userLocation = L.icon({
  iconUrl: userLocationSvg,
  iconSize: [50, 82]
});


class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    haveUsersLocation: false,
    zoom: 2
  }

  componentDidMount() {
    getLocation()
    .then(location => {
      this.setState({
        location,
        haveUsersLocation: true,
        zoom: 13
      });
    });
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <div className="App">
          <Map
          zoomControl={false}
          className="map"
          worldCopyJump={true}
          center={position}
          zoom={this.state.zoom}
          >
          <TileLayer
            url={openMapTiles}
          />
          <SwipeableTemporaryDrawer></SwipeableTemporaryDrawer>
          {
            this.state.haveUsersLocation ? 
            <Marker
              position={position}
              icon={userLocation}>
            </Marker> : ''
          }
        </Map>     
      </div>
    );
  }
}
export default App;
