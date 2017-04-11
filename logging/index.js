const ObjectId = require('mongoose').Types.ObjectId;
const _ = require('underscore')

let ClientModel = require('../models/client');
let LoggingModel = require('../models/logging');

let loggingPing = (mac_address, message) => {
  ClientModel.find({ mac_address: mac_address }).exec(function (err, client) { 
    if (err) throw err
    if (!_.isEmpty(client)) {
      let logging = new LoggingModel({
      client: client[0]._id,
      message: message,
      date: new Date()
    })
      
    logging.save(function(err) {
      if (err) throw err
      console.log('Client ping logged!');
    });
    }
  })
}

let isMacAddressActive = (mac_address, callback) => {
  let isActive = false;
  ClientModel.findOne({ mac_address: mac_address }).exec(function (err, client) {
    if (err) throw err
    if (client) {
      isActive = (client.active) ? true : false
    }
    callback(isActive)
  })
}

module.exports = {
  loggingPing,
  isMacAddressActive
}
