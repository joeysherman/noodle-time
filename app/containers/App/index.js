/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from 'containers/HomePage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import PlacesPage from 'containers/PlacesPage/Loadable';

import GlobalStyle from '../../global-styles';
import Navbar from '../../components/Navbar';

export default function App() {
  return (
    <React.Fragment>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/places" component={PlacesPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </React.Fragment>
  );
}
