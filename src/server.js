/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import expressSession from 'express-session';
import connectMongo from 'connect-mongo';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import WebSocketServer from './webSocketServer';
import Globals from './core/Globals';
import mongoose from 'mongoose';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Flux from './Flux';
import Iso from 'iso';
import Html from './components/Html';
import NullComponent from './components/NullComponent';

const server = global.server = express();
const port = process.env.PORT || 5000;
const database = 'slr-integration-web'; // TODO: get value from private config file?

server.set('port', port);

//
// Configure moongose and connect to the database
// -----------------------------------------------------------------------------

mongoose.Promise = global.Promise; // Use native promises

mongoose.connect(`mongodb://localhost/${database}`);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------

// support json encoded bodies
server.use(bodyParser.json());
// support encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cookieParser());

// session
const MongoStore = connectMongo(expressSession);
server.use(expressSession({
  secret: 'CZ08[yQhXAeP3c8A{_7MkPo)JQ9djs', // TODO: generate on deploy?
  rolling: true,
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static(path.join(__dirname, 'public')));


//
// Register Globals
// -----------------------------------------------------------------------------

// services server implementation
Globals.services = require('./server/Services');

server.use((req, res, next) => {
  Globals.req = req;
  Globals.res = res;
  next();
});

//
// Register API middleware
// -----------------------------------------------------------------------------
server.use('/api', require('./server/api/index'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    const flux = new Flux(req, res);

    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', prefetched: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
      flux: flux,
    };

    await flux.getStore('accountStore').fetch();
    const user = flux.getStore('accountStore').getState();

    let componentToRender = null;
    await Router.dispatch({ path: req.path, context, user }, (state, component) => {
      componentToRender = component;
    });

    // render and/or wait for the completition of async tasks
    // until either there are no more or a redirect is triggered
    while (true) {
      if (flux.location) {
        break;
      }

      if (componentToRender.type !== NullComponent) {
        data.body = ReactDOM.renderToString(componentToRender);
        data.css = css.join('');
      }

      if (flux.promises.length === 0) {
        break;
      }

      await Promise.all(flux.promises);
    }

    if (flux.location) {
      res.redirect(flux.location);
    } else if (componentToRender.type === NullComponent) {
      res.status(400).send();
    } else {
      const iso = new Iso();
      const fluxSnapshot = flux.takeSnapshot();
      iso.add(null, fluxSnapshot, null);
      data.prefetched = iso.render();

      const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
      res.status(statusCode).send('<!doctype html>\n' + html);
    }
  } catch (err) {
    next(err);
  }
});

//
// Configure passport
// -----------------------------------------------------------------------------

const User = require('./server/models/User');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});

//
// Launch the websocket server
// -----------------------------------------------------------------------------
const webSocketServer = new WebSocketServer(server);
Globals.webSocketServer = webSocketServer;
webSocketServer.start();
