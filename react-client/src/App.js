import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';
import { Provider } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';

import apolloClient from './clients/graphql';
import store from './store';
import { checkAuthAction } from './store/actions/auth.action';

const Admin = lazy(() => import('./components/Admin'));
const Site = lazy(() => import('./components/Site'));

store.dispatch(checkAuthAction());

function App() {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter>
            <CssBaseline />
            <Switch>
              <Route path="/admin" render={(props) => <Admin {...props} />} />
              <Route path="/" render={(props) => <Site {...props} />} />
            </Switch>
          </BrowserRouter>
        </Suspense>
      </ApolloProvider>
    </Provider>
  );
}

export default App;
