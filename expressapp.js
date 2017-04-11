'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const router = require('./core/router');
const path = require('path');

const expressapp = express();

expressapp.set('view engine', 'pug')
expressapp.locals._ = require("underscore");
expressapp.use(bodyParser.urlencoded( { extended: false } ));
expressapp.use(bodyParser.json());
expressapp.use(router);
expressapp.use(express.static(path.join(__dirname, 'public')));

module.exports = expressapp;