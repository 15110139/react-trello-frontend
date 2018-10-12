import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    color: 'inherit'
  }
};

function Navbar(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="title" color="inherit" className={classes.grow}>
            React Trello
          </Typography>
          <Button component={NavLink} to="/home/sign-in" color="inherit">
            Sign In
          </Button>
          <Button component={NavLink} to="/home/sign-up" color="inherit">
            Sign Up
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withStyles(styles)(Navbar);
