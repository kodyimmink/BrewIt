import React from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Collapse, Card, CardBody, CardHeader } from 'reactstrap';

export default class BreweryListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      collapse: false
    };

    this.item = props.item;
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
        <CardHeader onClick={this.toggleCollapse}>{this.item.name}</CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <ul>
                  <li>{this.item.id}</li>
                  <li>{this.item.name}</li>
                  <li>{this.item.website}</li>
                </ul>
              </CardBody>
            </Card>
          </Collapse>
      </div>
    );
  }
}