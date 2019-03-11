import React, { Component } from 'react';
import SwipeableTemporaryDrawer from './components/SwipeableTemporaryDrawer';

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

import './App.css';
import './'

const openMapTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";


class App extends Component {
  state = {
    location: {
      lat: 51.505,
      lng: -0.09,
    },
    zoom: 2
  }

  /*componentDidMount() {
    //TO-DO: navigator.geolocation.getCurrentPosition(pos=> position);
  }*/

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
        </Map>     
      </div>
    );
  }
}
export default App;
