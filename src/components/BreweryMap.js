import React, { Component } from 'react';

import L from 'leaflet';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import { connect } from 'react-redux';
import { actions } from '../store';

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
  
   componentDidMount() {
     this.props.onSetInitialPosition();

     //this is still not async, I tried to implement but am unable to at the moment
        //temporary solution until I can figure it out
      setTimeout( function(){
        this.props.onSetBreweriesList(this.props.location);
        this.props.onUpdateMapCenter(this.props.location);
      }.bind(this), 500);
     //this is not async, does not wait for location to be determined.
     //TO-DO: need to make this wait for location before running.
     //this.props.onSetBreweriesList(this.props.location);
   }

  render() {
    const position = [this.props.location.lat, this.props.location.lng];
    return (
      <Map
        animate={true}
        zoomControl={false}
        worldCopyJump={true}
        center={this.props.mapCenter}
        zoom={this.props.zoom}
        >
        <TileLayer
          url={openMapTiles}
        />
        {
        this.props.haveUsersLocation ? 
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
          this.props.localBreweriesList.map(brewery => (
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
                <a href={brewery.website_url} target='_blank'>{brewery.website_url}</a>
              </Popup>
            </Marker>
          ))
        }
      </Map>
    );
  }
}

function mapStateToProps(state){
  return {
      location: state.location,
      haveUsersLocation: state.haveUsersLocation,
      zoom: state.zoom,
      localBreweriesList: state.localBreweriesList,
      mapCenter: state.mapCenter,
  };
}

function mapDispatchToProps(dispatch){
  return {
    onSetInitialPosition(){
      dispatch(actions.setInitialPosition());
    },
    onSetBreweriesList(position){
      dispatch(actions.setBreweriesList(position));
    },
    onUpdateMapCenter(coords){
      dispatch(actions.setMapCenter(coords));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreweryMap);
