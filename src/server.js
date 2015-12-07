/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import Globals from './core/Globals';
import mongoose from 'mongoose';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
import Flux from './Flux';
import Iso from 'iso';
import Html from './components/Html';

const server = global.server = express();
const port = process.env.PORT || 5000;
const database = 'slr-integration-web'; // TODO: get value from private config file?

server.set('port', port);

//
// Register Node.js middleware
// -----------------------------------------------------------------------------

// support json encoded bodies
server.use(bodyParser.json());
// support encoded bodies
server.use(bodyParser.urlencoded({ extended: true }));

server.use(cookieParser());

// session
server.use(require('express-session')({
  secret: 'CZ08[yQhXAeP3c8A{_7MkPo)JQ9djs', // TODO: generate on deploy?
  rolling: true,
  resave: true,
  saveUninitialized: false,
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
server.use('/api', require('./server/api/main'));

//
// Register server-side rendering middleware
// -----------------------------------------------------------------------------
server.get('*', async (req, res, next) => {
  try {
    let statusCode = 200;
    const data = { title: '', description: '', css: '', body: '', prefetched: '' };
    const css = [];
    const flux = new Flux();
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
      flux: flux,
    };

    /*
    await flux.getActions('accountActions').fetch();
    const user = flux.getStore('accountStore').getState();

    await Router.dispatch({ path: req.path, context, user }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });*/

    await flux.getActions('accountActions').fetch(req);
    const user = flux.getStore('accountStore').getState();

    let componentToRender = null;
    await Router.dispatch({ path: req.path, context, user }, (state, component) => {
      componentToRender = component;
    });

    let fullRendered = false;
    while (!fullRendered) {
      data.body = ReactDOM.renderToString(componentToRender);
      data.css = css.join('');

      if (flux.promises.length !== 0) {
        await flux.promises.all();
      } else {
        fullRendered = true;
      }
    }

    const iso = new Iso();
    iso.add(null, flux.takeSnapshot(), null);
    data.prefetched = iso.render();

    const html = ReactDOM.renderToStaticMarkup(<Html {...data} />);
    res.status(statusCode).send('<!doctype html>\n' + html);
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
// Connect to the database
// -----------------------------------------------------------------------------

mongoose.connect(`mongodb://localhost/${database}`);


//
// Launch the server
// -----------------------------------------------------------------------------
server.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`The server is running at http://localhost:${port}/`);
});
