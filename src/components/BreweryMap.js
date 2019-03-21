import React, { Component } from 'react';

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import {getLocation} from '../methods/getLocation';
import {searchBreweries} from '../methods/searchBreweries';
import {getReverseLocation} from '../methods/getReverselocation';

import userLocationSvg from '../icons/userLocation.svg';
import brewitLogo from '../icons/brewitLogo.svg'

const openMapTiles = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const breweryIcon = L.icon({
  iconUrl: brewitLogo,
  iconSize: [25, 41]
});

const userLocation = L.icon({
  iconUrl: userLocationSvg,
  iconSize: [25, 41]
});

class BreweryMap extends Component{
  constructor(){
    super();

    this.state = {
      location: {
        lat: 51.505,
        lng: -0.09,
      },
      haveUsersLocation: false,
      zoom: 2,
      localBreweriesList: [],
    }
  }

  componentDidMount() {
    //get users geolocation
    getLocation()
    .then(location => {
      this.setState({
        location,
        haveUsersLocation: true,
        zoom: 8
      }, () => { //callback function called here
        getReverseLocation(this.state.location.lat, this.state.location.lng)
        .then(zipCode => searchBreweries(zipCode)
        .then(results => {
          this.setState({
            localBreweriesList: results,
          })
        }))
        });
    })
  }

  render() {
    const position = [this.state.location.lat, this.state.location.lng];
    return (
      <Map
        animate={true}
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
            <Popup
              className='custom-popup leaflet-popup-content-wrapper'>
              Latitude: {position[0]} 
              <br />
              Longitude: {position[1]}
            </Popup>
          </Marker> : ''
        }
        {
          this.state.localBreweriesList.map(brewery => (
            <Marker
              key={brewery.id}
              position={[brewery.latitude, brewery.longitude]}
              icon={breweryIcon}
              >
              <Popup 
                className='custom-popup leaflet-popup-content-wrapper'
                >
                <b>{brewery.name}</b><br />
                {brewery.street}<br />
                {brewery.city}, {brewery.state} {brewery.postal_code}<br />
                <a href={brewery.website_url}>{brewery.website_url}</a>
              </Popup>
            </Marker>
          ))
        }
      </Map>
    );
  }
}
export default BreweryMap;
