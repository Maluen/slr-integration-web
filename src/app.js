/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import ReactDOM from 'react-dom';
import Flux from './Flux';
import Iso from 'iso';
import FastClick from 'fastclick';
import Router from './routes';
import Location from './core/Location';
import { addEventListener, removeEventListener } from './core/DOMUtils';
import Globals from './core/Globals';
import NullComponent from './components/NullComponent';
import WebSocketClient from './WebSocketClient';

// services client implementation
Globals.services = require('./client/Services');

let cssContainer = document.getElementById('css');
const appContainer = document.getElementById('app');
const flux = new Flux();
const context = {
  onSetTitle: value => document.title = value,
  onSetMeta: (name, content) => {
    // Remove and create a new <meta /> tag in order to make it work
    // with bookmarks in Safari
    const elements = document.getElementsByTagName('meta');
    [].slice.call(elements).forEach((element) => {
      if (element.getAttribute('name') === name) {
        element.parentNode.removeChild(element);
      }
    });
    const meta = document.createElement('meta');
    meta.setAttribute('name', name);
    meta.setAttribute('content', content);
    document.getElementsByTagName('head')[0].appendChild(meta);
  },
  flux: flux,
};

function render(state) {
  Router.dispatch(state, (newState, component) => {
    if (component.type !== NullComponent) {
      ReactDOM.render(component, appContainer, () => {
        // Restore the scroll position if it was saved into the state
        if (state.scrollY !== undefined) {
          window.scrollTo(state.scrollX, state.scrollY);
        } else {
          window.scrollTo(0, 0);
        }

        // Remove the pre-rendered CSS because it's no longer used
        // after the React app is launched
        if (cssContainer) {
          cssContainer.parentNode.removeChild(cssContainer);
          cssContainer = null;
        }
      });
    }
  });
}

async function run() {
  let currentLocation = null;
  let currentUser = null;
  let currentState = null;

  // Make taps on links and buttons work fast on mobiles
  FastClick.attach(document.body);

  // restore flux state sent by server
  Iso.bootstrap((fluxSnapshot) => {
    // Now I do something with this data, perhaps run it through some library and then append the result to node?
    flux.bootstrap(fluxSnapshot);
  });

  const webSocketClient = new WebSocketClient;
  Globals.webSocketClient = webSocketClient;
  await webSocketClient.start();

  // Re-render the app when window.location changes
  const unlisten = Location.listen(location => {
    currentLocation = location;
    currentUser = flux.getStore('accountStore').getState();
    currentState = Object.assign({}, location.state, {
      path: location.pathname,
      query: location.query,
      state: location.state,
      context,
      user: currentUser,
    });
    render(currentState);
  });

  // Save the page scroll position into the current location's state
  const supportPageOffset = window.pageXOffset !== undefined;
  const isCSS1Compat = ((document.compatMode || '') === 'CSS1Compat');
  const setPageOffset = () => {
    currentLocation.state = currentLocation.state || Object.create(null);
    if (supportPageOffset) {
      currentLocation.state.scrollX = window.pageXOffset;
      currentLocation.state.scrollY = window.pageYOffset;
    } else {
      currentLocation.state.scrollX = isCSS1Compat ?
        document.documentElement.scrollLeft : document.body.scrollLeft;
      currentLocation.state.scrollY = isCSS1Compat ?
        document.documentElement.scrollTop : document.body.scrollTop;
    }
  };

  addEventListener(window, 'scroll', setPageOffset);
  addEventListener(window, 'pagehide', () => {
    removeEventListener(window, 'scroll', setPageOffset);
    unlisten();
  });
}

// Run the application when both DOM is ready and page content is loaded
if (['complete', 'loaded', 'interactive'].includes(document.readyState) && document.body) {
  run();
} else {
  document.addEventListener('DOMContentLoaded', run, false);
}
