import React from 'react';
import { Modal, ModalHeader, ModalBody, ListGroup, Badge} from 'reactstrap';
import BreweryListItem from './BreweryListItem';

import { connect } from 'react-redux';
import { actions } from '../store';

class FavoritesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};

      //this.breweries = this.props.favoriteBreweries
      this.listItems = this.props.favoriteBreweries.map((brewery) =>                             
        <BreweryListItem key={brewery.id} item={brewery} /> );

      this.toggle = this.toggle.bind(this);
    }

    
    toggle() {
        this.props.onToggleFavoritesModal(this.props.favoriteModal);
    }

    render() {
        return (
          <div>
            <Modal isOpen={this.props.favoriteModal} toggle={this.toggle} size='lg'>
              <ModalHeader toggle={this.toggle}>My Breweries<br />
              <div> 
                <Badge className='badgeMargin bg-dkblue text-white'>micro</Badge>{' '}
                <Badge className='badgeMargin bg-lgblue text-white'>regional</Badge>{' '}
                <Badge className='badgeMargin bg-orange text-white'>large</Badge>{' '}
                <Badge className='badgeMargin bg-green text-white'>brewpub</Badge>{' '}
                <Badge className='badgeMargin bg-grey text-white'>planning</Badge>{' '}
              </div>
              </ModalHeader>
              <ModalBody>
                <ListGroup>
                    {this.listItems}
                </ListGroup>
              </ModalBody>
            </Modal>
          </div>
        );
      }
    }

  function mapStateToProps(state){
    return {
      favoriteBreweries: state.favoriteBreweries,
      favoriteModal: state.favoriteModal,
    };
  }

  function mapDispatchToProps(dispatch){
    return {
      onToggleFavoritesModal(modalBool){
        dispatch(actions.toggleFavoritesModal(modalBool));
      },
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesList);
