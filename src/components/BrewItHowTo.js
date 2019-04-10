import React from 'react';
import { Button, Collapse } from 'reactstrap';

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
              </ul>
        </div>
        </Collapse>
      </div>
    );
  }
}
export default BrewItHowTo;