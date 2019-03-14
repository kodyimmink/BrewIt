import React, { Component } from 'react';
import breweryLogo, { ReactComponent } from '../icons/beerLogo.svg';

class Logo extends Component{

    home(e) {
        e.preventDefault();
        window.location = '/';
    }

    render() {
       return <div onClick={this.home}>
       <span className="logoImgTitle" > <img src={breweryLogo} alt="brewit logo" width='50' height='50'/>BrewIt</span>
     </div>
       }
 }

 export default Logo;