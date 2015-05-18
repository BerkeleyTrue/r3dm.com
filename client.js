'use strict';
import Rx from 'rx';
import React from 'react';
import Router from './components/Router.jsx';
import debugFactory from 'debug';
import { HistoryLocation } from 'react-router';
import R3d from './components/context/';

const debug = debugFactory('r3dm:client');
const mountNode = document.getElementById('app');
const r3d = new R3d();

// enabled by setting localStore.debug to *
if (debug.enabled) {
  Rx.config.longStackSupport = true;
}

Router(HistoryLocation)
  .flatMap(({ Handler, state }) => {
    debug('rendering %s...', state.path);
    return r3d.render(React.createElement(Handler), mountNode);
  })
  .subscribe(() => {
    debug('React rendered!');
  });
