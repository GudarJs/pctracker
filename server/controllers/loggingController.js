const ObjectId = require('mongoose').Types.ObjectId;

let ClientModel = require('../models/client');
let LoggingModel = require('../models/logging');

module.exports = (router) => {

    router.get('/logs/:id', function(req, res) {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(404).send({error: 'model not found.'});
        }  
      LoggingModel.find({}).populate({
          path: 'client',
          match: {
              _id: req.params.id
          }  
      }).exec(function (err, logs) {
        if (err) throw err;
        logs = logs.filter((log) => { return log.client })
        res.status(200).send(logs)
      })
  })

}
