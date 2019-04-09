import React, { Component } from 'react';
import brewitLogo from '../icons/brewItLogoWhiteTransparent.png'

class Logo extends Component{

    home(e) {
        e.preventDefault();
        window.location = '/';
    }

    render() {
       return <div onClick={this.home}>
       <span> <img src={brewitLogo} alt="brewit logo" width='120' height='50'/></span>
     </div>
       }
}

 export default Logo;