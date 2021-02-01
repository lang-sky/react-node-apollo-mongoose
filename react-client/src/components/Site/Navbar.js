import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { SIGNOUT } from '../../store/types';

const Navbar = () => {
  const classes = useStyles();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch({ type: SIGNOUT });
  };

  return (
    <AppBar position="static" className={classes.appBar}>
      <Toolbar>
        {[
          { to: '/', label: 'Home' },
          { to: '/messages', label: 'Messages' },
        ].map(({ to, label, hide }, i) => (
          <div key={i}>
            <Link key={i} to={to} className={classes.link}>
              {label}
            </Link>
          </div>
        ))}
        {isLoggedIn ? (
          <Button onClick={handleSignOut}>Sign Out</Button>
        ) : (
          <>
            {[
              { to: '/signup', label: 'Sign Up' },
              { to: '/signin', label: 'Sign In' },
            ].map(({ to, label }, i) => (
              <div key={i}>
                <Link key={i} to={to} className={classes.link}>
                  {label}
                </Link>
              </div>
            ))}
          </>
        )}
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
