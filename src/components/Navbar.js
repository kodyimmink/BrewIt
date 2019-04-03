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
  DropdownMenu,
  DropdownItem,
  Button } from 'reactstrap';


class BrewitNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.toggle = this.toggle.bind(this);
    this.toggleFavModal = this.toggleFavModal.bind(this);
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

  toggleFavModal() {
    this.props.onToggleFavoritesModal(this.props.favoriteModal);
    
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
                <DropdownMenu right>
                  <DropdownItem>
                    Account Link
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <div className="row">
                {this.props.haveUserFavorites ?
                  <div>
                  <Button color="danger" size="lg" onClick={this.toggleFavModal} >My Breweries</Button>
                    <FavoritesList />
                  </div> 
                  : 
                  null
                }
                {this.props.user ?
                  <div>
                    <Button color="secondary" size="lg" onClick={this.logout}>Logout</Button>  
                  </div>
                  :
                  <div>
                    <Button color="primary" size="lg" onClick={this.login}>Login</Button>
                  </div>            
                }
              </div>
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
      haveUserFavorites: state.haveUserFavorites,
      favoriteModal: state.favoriteModal
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
      },
      onToggleFavoritesModal(modalBool){
        dispatch(actions.toggleFavoritesModal(modalBool));
      },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrewitNavbar);