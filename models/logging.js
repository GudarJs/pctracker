'use strict'

const mongoose = require('mongoose');

const Schema = mongoose.Schema

const loggingSchema = new Schema({
  client: { type: Schema.ObjectId, ref: 'Client' },
  message: String,
  date: Date
})

module.exports = mongoose.model('Logging', loggingSchema)
