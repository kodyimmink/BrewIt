import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  rootDiv: {
      position: 'absolute',
      margin: 'auto',
      padding: '10px',
  },
  fab: {
    margin: theme.spacing.unit,
    position: 'absolute',
    padding: '10px',
  },
});

function FloatingActionButtons(props) {
  const { classes } = props;
  return (
    <div className='rootDiv'>
      <Fab variant="extended" size="medium" color="primary" className={classes.fab}>
        Login
      </Fab>
    </div>
  );
}

FloatingActionButtons.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FloatingActionButtons);