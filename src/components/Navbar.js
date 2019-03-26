import React from 'react';
import Logo from './Logo';
import { auth, provider } from '../fire';

import { connect } from 'react-redux';
import { actions } from '../store';

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


    this.getDocId = this.getDocId.bind(this);
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,
    };
  }

  //temp function remove 
  getDocId(){
    //console.log(this.props.user.uid);
    this.props.onGetUserDocId(this.props.user.uid);
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
          this.props.onGetUserFavorites(result.user.uid);
          this.props.onGetUserDocId(result.user.uid);
        });
    }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.onSetUserAccount(user);
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
          <Button color="secondary" size="lg" onClick={this.getDocId}>Get User Document ID</Button>
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
                  <DropdownItem divider />
                  <DropdownItem>
                  Sign out Function
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
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
      user: state.user
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
      onGetUserFavorites(uid){
        dispatch(actions.getUserFavorites(uid));
      },
      onGetUserDocId(uid){
        dispatch(actions.getUserDocId(uid));
      }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BrewitNavbar);