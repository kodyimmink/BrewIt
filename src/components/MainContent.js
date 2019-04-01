import React from 'react';
import BrewItInfo from './BrewItInfo';
import BrewerySearch from './BrewerySearch';
import BreweryMap from './BreweryMap';

function MainContent(){
    return(
      <div className='mainContent'>
        <main>
          <BrewItInfo />
          <BrewerySearch />
          <BreweryMap />
        </main>
      </div> 
    );
  }

  export default MainContent;