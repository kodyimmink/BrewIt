import React from 'react';
import BrewItInfo from './BrewItInfo';
import BrewerySearch from './BrewerySearch';
import BreweryMap from './BreweryMap';
import BrewItHowTo from './BrewItHowTo';

export default function MainContent(){
    return(
      <div className='mainContent'>
        <main>
          <BrewItInfo />
          <BrewerySearch />
          <BreweryMap />
          <BrewItHowTo />
        </main>
      </div> 
    );
  }