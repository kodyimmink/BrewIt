import React from 'react';

function BrewItInfo(){
    return(
      <div className='myInfo'>
        <h1>Welcome to BrewIt!</h1>
        <p>
          BrewIt is a web app that makes it easy to find breweries in your area. 
        </p>
        <h2>How to use</h2>
        <ul>
          <li>Click any beer mug on the map to find more information.</li>
          <li>Use the search bar to find a specific brewery.</li>
          <li>Create a list of favorite breweries by liking breweries you want to keep track of</li>
        </ul>
      </div> 
    );
  }
  export default BrewItInfo;