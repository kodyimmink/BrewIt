import React from 'react';
import { Collapse, Card, CardBody, CardHeader } from 'reactstrap';

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
    this.handleWebsiteClick = this.handleWebsiteClick.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  }

  toggleCollapse() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleWebsiteClick(){
    console.log("Website Link Clicked!");
  }

  render() {
    return (
      <div>
        <CardHeader onClick={this.toggleCollapse}>{this.item.name}</CardHeader>
          <Collapse isOpen={this.state.collapse}>
            <Card>
              <CardBody>
                <ul>
                  <li>{this.item.street}<br />
                      {this.item.city}, {this.item.state} {this.item.postal_code} <br />
                  </li>
                  <li>{this.item.phone}</li>
                  <li><a href={this.item.website_url}>{this.item.website_url}</a></li>
                </ul>
              </CardBody>
            </Card>
          </Collapse>
      </div>
    );
  }
}