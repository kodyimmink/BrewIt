import React from 'react';
import {addBreweriesToDb} from '../methods/addBreweries';

function Footer(){
    return(
      <div className='pageFooter'>
        <h3>TO-DO: put BrewIt general and contact info here</h3>
        <button onClick={addBreweriesToDb}>Click to add breweries.</button> 
      </div>
    );
  }

export default Footer;