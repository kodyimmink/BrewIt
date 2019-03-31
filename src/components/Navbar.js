import React from 'react';
import Logo from './Logo';
import { auth, provider } from '../fire';

import { connect } from 'react-redux';
import { actions } from '../store';

import FavoritesList from './FavoritesList';

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button } from 'reactstrap';


class BrewitNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    auth.signOut()
      .then( () => {
        this.props.onClearUserAccount();
      });
    }
  
  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        this.props.onSetUserAccount(result.user);
        this.props.onGetUserDocId(this.props.user.uid);

        //this is still not async, I tried to implement but am unable to at the moment
        //temporary solution until I can figure it out
        setTimeout( function(){
          this.props.onGetUserFavorites(this.props.userDocId);
        }.bind(this), 1000);
    })
  }
    
  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.onSetUserAccount(user);
        this.props.onGetUserDocId(this.props.user.uid);

        //this is still not async, I tried to implement but am unable to at the moment
        //temporary solution until I can figure it out
        setTimeout( function(){
          this.props.onGetUserFavorites(this.props.userDocId);
        }.bind(this), 1000);
      } 
    });
  }

  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">
            <Logo />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Settings
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                    Account Link
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {this.props.haveUserFavorites ?
                <div className="divPadding">
                <FavoritesList breweries={this.props.favoriteBreweries}/>
              </div>: ''
              }
              {this.props.user ?
                <Button color="secondary" size="lg" onClick={this.logout}>Logout</Button>               
                :
                <Button color="primary" size="lg" onClick={this.login}>Login</Button>            
              }
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

function mapStateToProps(state){
  return {
      user: state.user,
      userDocId: state.userDocId,
      favoriteBreweries: state.favoriteBreweries,
      haveUserFavorites: state.haveUserFavorites
  };
}

function mapDispatchToProps(dispatch){
  return {
      onSetUserAccount(account){
          dispatch(actions.setUserAccount(account));
      },
      onClearUserAccount(){
        dispatch(actions.clearUserAccount());
      },
      onGetUserDocId(uid){
        dispatch(actions.getUserDocId(uid));
      },
      onGetUserFavorites(docId){
        dispatch(actions.getUserFavorites(docId));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrewitNavbar);