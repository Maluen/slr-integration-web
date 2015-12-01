/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import 'babel-core/polyfill';
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import mongoose from 'mongoose';
import React from 'react';
import ReactDOM from 'react-dom/server';
import Router from './routes';
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
  resave: false,
  saveUninitialized: false,
}));
server.use(passport.initialize());
server.use(passport.session());

server.use(express.static(path.join(__dirname, 'public')));

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
    const data = { title: '', description: '', css: '', body: '' };
    const css = [];
    const context = {
      onInsertCss: value => css.push(value),
      onSetTitle: value => data.title = value,
      onSetMeta: (key, value) => data[key] = value,
      onPageNotFound: () => statusCode = 404,
    };

    await Router.dispatch({ path: req.path, context }, (state, component) => {
      data.body = ReactDOM.renderToString(component);
      data.css = css.join('');
    });

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
