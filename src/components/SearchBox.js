import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = {
  searchBox:{
    position: 'absolute',
    width: '30%',
    minWidth: '300px',
    marginLeft: '10%',
    marginRight: '',
    padding: '10px',
  },
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
};

function CustomizedInputBase(props) {
  const { classes } = props;

  return (
    <div className={classes.searchBox}>
      <Paper className={classes.root} elevation={1}>
      <InputBase className={classes.input} placeholder="Enter Address, Zip, or a Brewery" />
      <IconButton className={classes.iconButton} aria-label="Search">
        <SearchIcon />
      </IconButton>
      </Paper>
    </div>
  );
}

CustomizedInputBase.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomizedInputBase);