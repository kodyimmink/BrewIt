import React from 'react';
import { Button, Collapse, Card, CardBody, CardHeader } from 'reactstrap';
import StarRating from './StarRating';
import ReviewModal from './ReviewModal';

import { connect } from 'react-redux';
import { actions } from '../store';

class BreweryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };

    this.item = props.item;
    this.toggleCollapse = this.toggleCollapse.bind(this);
    this.removeFavorite = this.removeFavorite.bind(this);
    this.updateMapCenter = this.updateMapCenter.bind(this);
    this.openReviewModal = this.openReviewModal.bind(this);
  }

  toggleCollapse() {
    this.setState(state => ({ collapse: !state.collapse }));
  }
  
  removeFavorite(){
    console.log("Removed Favorite");
    this.props.onRemoveFavoriteBrewery(this.props.userDocId, this.item)
  }

  updateMapCenter(){
    const coords = {
      lat: this.item.latitude,
      lng: this.item.longitude,
    }
    this.props.onUpdateMapCenter(coords)
  }

  openReviewModal() {
    this.props.onToggleReviewModal(this.props.reviewModal);
  }

  render() {
    let bgColor

    switch(this.item.brewery_type) {
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
      <div>
        <CardHeader className={bgColor} onClick={this.toggleCollapse}>{this.item.name}</CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <ul>
                  { true ? <li><b>Address: </b>{this.item.street}<br />
                  {this.item.city}, {this.item.state} {this.item.postal_code} <br />
                  </li> : '' }
                  { this.item.phone !== '' ? <li><b>Phone: </b>{this.item.phone}</li> : ''}
                  { this.item.website_url !== '' ? <li><b>Website: </b><a href={this.item.website_url} target="_blank" >{this.item.website_url}</a></li>: ''}
                  <li><StarRating userId={this.props.user.uid} item={this.item}/></li>
                  { this.item.street === '' && this.item.city === '' && this.item.state === '' && this.item.postal_code === '' && 
                    this.item.phone === '' && this.item.website_url === ''? <li><b>No information is availble</b></li>: ''}
                </ul>
                <br />
                <div className='row'>
                  <div className='columnThree'>
                  <Button onClick={this.removeFavorite} size='md' color="info">Remove</Button>
                  </div>
                  <div className='columnThree'>
                    <ReviewModal brewery={this.item}/> 
                  </div>
                  <div className='columnThree'>
                  {
                    this.item.latitude !== null || this.item.longitude !== null ? 
                    <Button onClick={this.updateMapCenter} size='md' color="info">Map</Button>
                    : ''
                  }
                  </div>
              </div>
              </CardBody>
            </Card>
          </Collapse>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      userDocId: state.userDocId,
      user: state.user,
  };
}

function mapDispatchToProps(dispatch){
  return {
    onRemoveFavoriteBrewery(docId, brewery){
      dispatch(actions.removeFavoriteBrewery(docId, brewery));
    },
    onUpdateMapCenter(coords){
      dispatch(actions.setMapCenter(coords));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BreweryListItem);
