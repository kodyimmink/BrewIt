import React, { Component } from 'react';

import fire, { auth, provider } from './fire';

import SwipeableTemporaryDrawer from './components/SwipeableTemporaryDrawer';
import SearchBox from './components/SearchBox';

import Logo from './components/Logo';

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
  constructor(){
    super();

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.state = {
      currentItem: '',
      username: '',
      items: [],
      user: null,

      location: {
        lat: 51.505,
        lng: -0.09,
      },
      haveUsersLocation: false,
      zoom: 2
    }
    
  }



  handleChange(e) {
    /* ... */
  }

  logout() {
  auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  componentDidMount() {
    
    //check user login status
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      } 
    });
    
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
      <div className="App">
        <SearchBox />
          <header>
            <div className="wrapper">
              <SwipeableTemporaryDrawer />
              <Logo />
              
              <div className='divPadding'>
                {this.state.user ?
                <button className='logoutButton' onClick={this.logout}>Logout</button>                
                :
                <button className='loginButton' onClick={this.login}>Log In</button>              
                }
              </div>
            </div>
          </header>
          
          {this.state.user ?
            <div>
              <div className='user-profile'>
                <img src={this.state.user.photoURL} />
              </div>
            </div>
            :
            <div className='wrapper'>
              <p>You must be logged in to favorite, rate and review breweries.</p>
            </div>
          }

          <div className='mapContainer'>
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
            {
              this.state.haveUsersLocation ? 
              <Marker
                position={position}
                icon={userLocation}>
              </Marker> : ''
            }
          </Map>
          </div>
          
      </div>
    );
  }
}
export default App;
