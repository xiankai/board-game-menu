// @flow
import type { State } from '../../common/types';
import HttpError from 'found/lib/HttpError';
import React from 'react';
import queryFirebase from './queryFirebase';
import { makeRouteConfig, Route } from 'found/lib/jsx';
import { onUsersPresence } from '../../common/users/actions';

// Pages
import App from './App';
import FieldsPage from '../fields/FieldsPage';
import BoardPage from '../board/BoardPage';
import HomePage from '../home/HomePage';

// Custom route to require viewer aka authenticated user.
const AuthorizedRoute = () => {};
AuthorizedRoute.createRoute = props => ({
  ...props,
  render: ({ Component, match, props }) => {
    const state: State = match.context.store.getState();
    if (!state.users.viewer) {
      // No redirect, just 401 Unauthorized, so we don't have to handle pesky
      // redirections manually. Check app/renderError.
      throw new HttpError(401);
    }
    return <Component {...props} />;
  },
});

const routeConfig = makeRouteConfig(
  <Route path="/" Component={App}>
    <Route Component={HomePage} />
    <Route path="lookup/:user" Component={BoardPage} />
  </Route>,
);

export default routeConfig;
