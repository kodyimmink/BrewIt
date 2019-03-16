import React from 'react';
import BrewItInfo from './BrewItInfo';
import BreweryMap from './BreweryMap';

function MainContent(){
    return(
      <div className='mainContent'>
        <main>
          <BrewItInfo />
          <BreweryMap />
        </main>
      </div> 
    );
  }

  export default MainContent;