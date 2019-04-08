import React from 'react';
import { Button, Collapse } from 'reactstrap';

class BrewItInfo extends React.Component {
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
      <div className='myInfo'>
        <h1>Welcome to BrewIt!</h1>
        <p>
          BrewIt is a web app that makes it easy to discover breweries in your area. 
        </p>
        <Button size='lg' color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }} >How to use</Button>
        <Collapse
          isOpen={this.state.collapse}
        >
          <ul>
            <li>Click any beer mug on the map to get details about a specific brewery.</li>
            <li>Type a state name in the search bar to get a list of breweries in your area.</li>
            <li>Create a list of favorite breweries by liking the ones you want to keep track of.</li>
            <li>Under My Breweries rate and review the breweries that you want to help support.</li>
          </ul>
        </Collapse>
      </div> 
    );
  }
}
  export default BrewItInfo;