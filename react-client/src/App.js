import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { ApolloProvider } from '@apollo/client';

import apolloClient from './clients/graphql';

const Admin = lazy(() => import('./components/Admin'));
const Site = lazy(() => import('./components/Site'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApolloProvider client={apolloClient}>
        <BrowserRouter>
          <Switch>
            <Route path="/admin" render={(props) => <Admin {...props} />} />
            <Route path="/" render={(props) => <Site {...props} />} />
          </Switch>
        </BrowserRouter>
      </ApolloProvider>
    </Suspense>
  );
}

export default App;
