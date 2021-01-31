import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const classes = useStyles();

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        <Link to="/" className={classes.link}>
          Home
        </Link>
        <Link to="/messages" className={classes.link}>
          Messages
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: grey[200],
  },
  link: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));
