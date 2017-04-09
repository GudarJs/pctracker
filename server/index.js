'use strict'

const mongoose = require('mongoose');

const app = require('./app');
const expressapp = require('./expressapp');
const config = require('./config');


mongoose.connect(config.db, (err, res) => {
  if (err) throw err;
  
  console.log("Database connection established");

  expressapp.listen(config.expressport, () => {
      console.log(`HTTP server listening on ${config.host}:${config.expressport}`);
  });

  app.listen(config.port, config.host, () => {
    console.log(`TCP Server listening on ${config.host}:${config.port}`)
  });
});
