'use strict'

const express = require('express');
const fs = require('fs');

const router = express.Router();

const routePath = __dirname + '/../controllers/';
fs.readdirSync(routePath).forEach(function (file) {
    require(routePath + file)(router);
});

module.exports = router;