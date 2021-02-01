import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const Home = lazy(() => import('./Home'));
const Messages = lazy(() => import('./Messages'));
const Message = lazy(() => import('./Message'));
const Navbar = lazy(() => import('./Navbar'));
const Profile = lazy(() => import('./Profile'));
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));

const Site = () => {
  const classes = useStyles();

  return (
    <>
      <Navbar />
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" render={(props) => <Home {...props} />} />
          <Route exact path="/messages" component={Messages} />
          <Route path="/messages/:id" component={Message} />
          <Route path="/profile" component={Profile} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Redirect to="/" />
        </Switch>
      </div>
    </>
  );
};

export default Site;

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5),
  },
}));
