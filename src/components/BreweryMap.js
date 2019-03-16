import React, { Component } from 'react';

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';
import {getLocation} from '../methods/getLocation';

import userLocationSvg from '../icons/userLocation.svg';

const openMapTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const userLocation = L.icon({
  iconUrl: userLocationSvg,
  iconSize: [50, 82]
});


class BreweryMap extends Component {
  constructor(){
    super();

    this.state = {
      location: {
        lat: 51.505,
        lng: -0.09,
      },
      haveUsersLocation: false,
      zoom: 2
    }
    
  }

  componentDidMount() {
    //get users geolocation
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
      <Map
        zoomControl={false}
        worldCopyJump={true}
        center={position}
        zoom={this.state.zoom}
        >
        <TileLayer
          url={openMapTiles}
        />
        {
        this.state.haveUsersLocation ? 
          <Marker
            position={position}
            icon={userLocation}
            >
            <Popup>
              Latitude: {position[0]} 
              <br />
              Longitude: {position[1]}
            </Popup>
          </Marker> : ''
        }
      </Map>
    );
  }
}
export default BreweryMap;
