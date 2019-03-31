import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ListGroup, Badge} from 'reactstrap';
import BreweryListItem from './BreweryListItem';

class FavoritesList extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        modal: false,
        collapse: false
      };

      this.breweries = props.breweries
      this.listItems = this.breweries.map((brewery) =>                             
      <BreweryListItem key={brewery.id} item={brewery} /> );


      this.toggle = this.toggle.bind(this);
      this.toggleCollapse = this.toggleCollapse.bind(this);
    }

    
    toggle() {
        this.setState(prevState => ({
          modal: !prevState.modal
        }));
    }
    
    toggleCollapse() {
        this.setState(state => ({ collapse: !state.collapse }));
    }

    render() {
        return (
            <div>
        <Button color="danger" size="lg" onClick={this.toggle} expand="lg">Favorites List</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Favorites List <br />
          <div> 
            <Badge className='badgeMargin bg-dkblue text-white'>micro</Badge>
            <Badge className='badgeMargin bg-lgblue text-white'>regional</Badge>
            <Badge className='badgeMargin bg-orange text-white'>large</Badge>
            <Badge className='badgeMargin bg-green text-white'>brewpub</Badge>
            <Badge className='badgeMargin bg-grey text-white'>planning</Badge>
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

export default FavoritesList;
