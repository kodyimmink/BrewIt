import React from 'react';
import Logo from './Logo';
import { auth, provider } from '../fire';

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

export default class brewitNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false,

      //auth variables
      user: null,
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
    }
  
    login() {
      auth.signInWithPopup(provider) 
        .then((result) => {
          const user = result.user;
          this.setState({
            user
          });
        });
    }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
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
                  <DropdownItem divider />
                  <DropdownItem>
                  Sign out Function
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              {this.state.user ?
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