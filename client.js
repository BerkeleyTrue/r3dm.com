'use strict';
import Rx from 'rx';
import React from 'react';
import Router from './components/Router.jsx';
import debugFactory from 'debug';
import { HistoryLocation } from 'react-router';
import R3d from './components/context/';

// enabled by setting localStore.debug to *
if (debugFactory.enabled) {
  Rx.config.longStackSupport = true;
}

const debug = debugFactory('r3dm:client');
const mountNode = document.getElementById('app');
const data = window && window.__R3DM__ ? window.__R3DM__.data : null;
const r3d = new R3d();


r3d.hydrate(data)
  .tap(() => debug('calling router'))
  .flatMap(() => Router(HistoryLocation))
  .flatMap(({ Handler, state }) => {
    debug('rendering %s...', state.path);
    return r3d.render(React.createElement(Handler), mountNode);
  })
  .subscribe(() => {
    debug('React rendered!');
  });
