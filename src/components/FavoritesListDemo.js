import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Collapse, Card, CardBody, CardHeader } from 'reactstrap';
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
          <ModalHeader toggle={this.toggle}>Favorites List</ModalHeader>
          <ModalBody>
            <ListGroup>
                {this.listItems}
            </ListGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
    }
}

export default FavoritesList;
