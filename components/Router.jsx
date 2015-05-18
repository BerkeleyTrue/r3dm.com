import Rx from 'rx';
import React from 'react';
import Router, { Route, NotFoundRoute, DefaultRoute } from 'react-router';

import App from './app';
import Blog from './blog';
import Home from './home';
import FourOhFour from './errors/404.jsx';

var routes = (
  <Route
    handler={ App }
    name='app'
    path='/'>

    <DefaultRoute
      handler={ Home }
      name='home'/>
    <Route
      handler={ Blog }
      name='blog'
      path='/blog/?:slug?'/>

    <NotFoundRoute handler={ FourOhFour } />
  </Route>
);

export default function createRouter(location) {
  return Rx.Observable.create(observer => {
    Router.run(routes, location, (Handler, state) => {
      observer.onNext({ Handler, state });
    });
  });
}
