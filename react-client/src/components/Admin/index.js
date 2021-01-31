import React, { lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

const Users = lazy(() => import('./Users'));

const Admin = () => {
  return (
    <div>
      Admin
      <Switch>
        <Route path="/admin/users" component={Users} />
        <Redirect to="/admin" />
      </Switch>
    </div>
  );
};

export default Admin;
