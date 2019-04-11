import React from 'react';
import { Badge, Button, Collapse } from 'reactstrap';

class BrewItHowTo extends React.Component {
  constructor(props){
    super();
    this.state = {
      collapse: false,
    }

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  render(){
    return(
        <div>
          <br />
          <div className='row'>
            <div className='column'>
              <Button size='lg' className='primary' onClick={this.toggle}>How to BrewIt</Button>
            </div>
          </div>
        <Collapse
          isOpen={this.state.collapse}
        >
        <br /> 
          <div className='howToList'>
              <ul>
                <p><b>Discover</b> breweries on the map.</p>
                <p><b>Search</b> for breweries in your area.</p>
                <p><b>Create</b> a list of favorite breweries.</p>
                <p><b>Rate and Review</b> your favorites.</p>
                <p><b><u>Brewery Types</u></b></p> 
              </ul>

              <div>
                
                <Badge className='badgeMargin bg-dkblue text-white'>micro</Badge>{' '}
                <Badge className='badgeMargin bg-lgblue text-white'>regional</Badge>{' '}
                <Badge className='badgeMargin bg-orange text-white'>large</Badge>{' '}
                <Badge className='badgeMargin bg-green text-white'>brewpub</Badge>{' '}
                <Badge className='badgeMargin bg-grey text-white'>planning</Badge>{' '}
              </div>
        </div>
        </Collapse>
      </div>
    );
  }
}
export default BrewItHowTo;