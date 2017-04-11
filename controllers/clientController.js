let ClientModel = require('../models/client');

module.exports = (router) => {

  router.get('/', function(req, res) {
    res.redirect(301, '/clients')
  })
    
  router.get('/clients', function(req, res) {
    let query = ClientModel.find({}).exec(function (err, clients) {
      if (err) throw err;
      res.render('index', { title: 'Clients List', clients: clients })
    })
  })
  router.get("/clients/add", (req, res) => {
      let client = new ClientModel()
      res.render('client_form', { title: 'Add client', action: 'add', id: '', client: client })
  });

  router.post("/clients/add", (req, res) => {
    let client = new ClientModel({
      mac_address: req.body.mac_address,
      ip_address: req.body.ip_address,
      active: req.body.active
    })
    client.save(function(err) {
      if (err) throw err;

      console.log('Client created!');
      res.redirect(301, '/clients')
    });
  });

  router.get("/clients/edit/:id", (req, res) => {
    ClientModel.findById(req.params.id, function(err, client) {
      if (err) throw err;
        
      res.render('client_form', { title: 'Edit client', action: 'edit', id: req.params.id, client: client })
    })
  })

  router.post("/clients/edit/:id", (req, res) => {
            console.log('Client updated!');
      ClientModel.findById(req.params.id, function(err, client) {
          if (err) throw err;

          client.mac_address = req.body.mac_address
          client.ip_address = req.body.ip_address
          client.active = req.body.active

          client.save(function(err) {
            if (err) throw err;

            console.log('Client updated!');
            res.redirect(301, '/clients')
          });          
      })
  })
    
  router.get('/clients/remove/:id', (req, res) => {
      console.log('Client deleted!');
      ClientModel.findByIdAndRemove(req.params.id, (err) => {
        if (err) throw err;

        console.log('Client deleted!');
        res.redirect(301, '/clients')
      })
  })

}
