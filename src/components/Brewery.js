import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import {Button} from 'reactstrap';


import { connect } from 'react-redux';
import { actions } from '../store';

class Brewery extends PureComponent {
  constructor(props) {
    super(props);


    this.updateFavBrewery = this.updateFavBrewery.bind(this);
    this.removeFavBrewery = this.removeFavBrewery.bind(this);
    this.updateMapCenter = this.updateMapCenter.bind(this);
  }


  updateFavBrewery(){
    this.props.onUpdateUserFavorites(this.props.userDocId, this.props.brewery);
    this.props.onGetUserFavorites(this.props.userDocId);
  }

  removeFavBrewery(){
    this.props.onRemoveFavoriteBrewery(this.props.userDocId, this.props.brewery);
    this.props.onGetUserFavorites(this.props.userDocId);
  }

  updateMapCenter(){
    let coords = {
      lat: this.props.brewery.latitude,
      lng: this.props.brewery.longitude,
    }
    if (coords.lat === null || coords.lng === null){
      coords = {
        lat: this.props.location.lat,
        lng: this.props.location.lng,
      }
    }
    this.props.onUpdateMapCenter(coords)
    this.props.onSetBreweriesList(coords);
  }
  
  render() {
    const { brewery } = this.props
    const {
      name,
      street,
      city,
      state,
      postal_code,
      country,
      brewery_type
    } = brewery
    let bgColor
    let address

    if (city !== '' && state !== '') {
      if (street === '')
        address = encodeURIComponent(`${name}, ${city}, ${state}`)
      else {
        address = encodeURIComponent(`${name}, ${street}, ${city}, ${state}`)
      }
    } else {
      address = null;
    }

    switch(brewery.brewery_type) {
      case 'micro':
        bgColor = 'bg-dkblue text-white'
        break
      case 'regional':
        bgColor = 'bg-lgblue text-white'
        break
      case 'large':
        bgColor = 'bg-orange text-white'
        break
      case 'brewpub':
        bgColor = 'bg-green text-white'
        break
      default:
        bgColor = 'bg-grey-light text-white'
    }


    return (
      <div className={`p-4 mb-2 rounded ${bgColor}`}>
        { (Object.keys(brewery).length !== 0) ?
          <div>
            <address className="roman">
              <div className="text-lg mb-2">
                <span className="font-bold">{name}</span>
                <span> ({brewery_type})</span>
              </div>
              { street !== '' ? <div>{street}</div> : '' }
              <div>
                { city !== '' ? <span>{city}, </span> : '' }
                { state !== '' ? <span>{state}, </span> : '' }
                { postal_code !== '' ? <span>{postal_code}, </span> : '' }
                { country !== '' ? <span>{country} </span> : '' }
              </div>
              <br>
              </br>
            </address>
              <div className='row'>
                  <div className='columnThree'>
                  <Button onClick={this.updateFavBrewery} color="info">Like</Button>
                  </div>
                  <div className='columnThree'>
                  <Button onClick={this.removeFavBrewery} color="info">Unlike</Button>
                  </div>
                  <div className='columnThree'>
                  {
                    this.props.brewery.latitude !== null || this.props.brewery.longitude !== null ? 
                    <Button onClick={this.updateMapCenter} size='md' color="info">Map</Button>
                    : ''
                  }
                  </div>
              </div>
          </div>
          :
          <span className='bg-grey-light text-white'>No brewery selected.</span>
        }
      </div>
    )
  }
}

Brewery.propTypes = {
  brewery: PropTypes.object.isRequired
}

function mapStateToProps(state){
  return {
      brewery: state.brewery,
      userDocId: state.userDocId,
      location: state.location,
      favoritesList: state.favoritesList
  };
}

function mapDispatchToProps(dispatch){
  return {
    onUpdateUserFavorites(docId, brewery){
      dispatch(actions.updateUserFavorites(docId, brewery));
    },
    onRemoveFavoriteBrewery(docId, brewery){
      dispatch(actions.removeFavoriteBrewery(docId, brewery));
    },
    onUpdateMapCenter(coords){
      dispatch(actions.setMapCenter(coords));
    },
    onGetUserFavorites(docId){
      dispatch(actions.getUserFavorites(docId));
    },
    onSetBreweriesList(coords){
      dispatch(actions.setBreweriesList(coords));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brewery);
