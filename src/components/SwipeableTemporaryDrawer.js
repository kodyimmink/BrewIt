import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import AccountCirle from '@material-ui/icons/AccountCircle';


const styles = {
  
  fullList: {
    width: 'auto',
    minWidth: 250,
  },
  menuButton: {
    '&:hover': {
      backgroundColor: '#1d5a91',
    },
    float: 'left',
    paddingRight: '5px',
    paddingLeft: '5px',
    paddingTop: '5px',
    paddingBottom: '5px',
    color: '#ffffff',
  },
};

class SwipeableTemporaryDrawer extends React.Component {
  state = {
    left: false,
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open,
    });
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.fullList}>
        <List>
        <ListItem button>
              <ListItemIcon>
                <AccountCirle />
              </ListItemIcon>
              <ListItemText>Account</ListItemText>
            </ListItem>
        </List>
        <Divider />
        <List>
            <ListItem button>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Settings</ListItemText>
            </ListItem>
        </List>
      </div>
    );

    return (
      <div>
        <IconButton>
          <MenuIcon className={classes.menuButton} onClick={this.toggleDrawer('left', true)}/>
        </IconButton>
        <SwipeableDrawer
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
      </div>
    );
  }
}

SwipeableTemporaryDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SwipeableTemporaryDrawer);