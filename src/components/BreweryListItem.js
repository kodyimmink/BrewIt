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
                  { this.item.website_url !== '' ? <li><b>Website: </b><a href={this.item.website_url}>{this.item.website_url}</a></li>: ''}
                  { this.item.street === '' && this.item.city === '' && this.item.state === '' && this.item.postal_code === '' && 
                    this.item.phone === '' && this.item.website_url === ''? <li><b>No information is availble</b></li>: ''}
                </ul>
              </CardBody>
            </Card>
          </Collapse>
      </div>
    );
  }
}