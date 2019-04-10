import React, { Component } from 'react';
import brewitLogo from '../icons/brewItLogoWhiteTransparent.svg'

export default class Logo extends Component{

    home(e) {
        e.preventDefault();
        window.location = '/';
    }

    render() {
       return <div onClick={this.home}>
       <span> <img src={brewitLogo} alt="brewit logo" width='84' height='35'/></span>
     </div>
       }
}