import React, { lazy } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

const Home = lazy(() => import('./Home'));
const Messages = lazy(() => import('./Messages'));
const Message = lazy(() => import('./Message'));
const Navbar = lazy(() => import('./Navbar'));
const Profile = lazy(() => import('./Profile'));
const SignIn = lazy(() => import('./SignIn'));
const SignUp = lazy(() => import('./SignUp'));

const Site = () => {
  return (
    <div>
      <Navbar />
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
  );
};

export default Site;
