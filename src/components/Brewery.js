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
  }


  updateFavBrewery(){
    console.log("Brewery that we are adding to the database: " +  this.props.brewery);
    this.props.onUpdateUserFavorites(this.props.userDocId, this.props.brewery)
  }

  removeFavBrewery(){
    console.log("Brewery that we are removing from the database: " +  this.props.brewery);
    this.props.onRemoveFavoriteBrewery(this.props.userDocId, this.props.brewery)
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
            { name ?
              <div>
                <Button className="favButtons" onClick={this.updateFavBrewery} color="info">Like</Button>
                <Button className="favButtons" onClick={this.removeFavBrewery} color="info">Unlike</Button>
              </div>
              : ''
            }
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
      userDocId: state.userDocId
  };
}

function mapDispatchToProps(dispatch){
  return {
    onUpdateUserFavorites(docId, brewery){
      dispatch(actions.updateUserFavorites(docId, brewery));
    },
    onRemoveFavoriteBrewery(docId, brewery){
      dispatch(actions.removeFavoriteBrewery(docId, brewery));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Brewery);
