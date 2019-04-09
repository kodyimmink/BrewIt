import React from 'react';
import BrewItInfo from './BrewItInfo';
import BrewerySearch from './BrewerySearch';
import BreweryMap from './BreweryMap';

function MainContent(){
    return(
      <div className='mainContent'>
        <main>
          <div className='myInfo'>
            <h1>Welcome to BrewIt!</h1>
              <h5>
              BrewIt is a web app that makes it easy to discover breweries in your area. 
            </h5>
          </div>
          <BrewerySearch />
          <BreweryMap />
          <BrewItInfo />
        </main>
      </div> 
    );
  }

  export default MainContent;