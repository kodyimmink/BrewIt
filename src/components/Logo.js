import React, { Component } from 'react';
import brewitLogo from '../icons/brewitLogo.svg'

class Logo extends Component{

    home(e) {
        e.preventDefault();
        window.location = '/';
    }

    render() {
       return <div onClick={this.home}>
       <span> <img src={brewitLogo} alt="brewit logo" width='50' height='50'/>BrewIt</span>
     </div>
       }
}

 export default Logo;