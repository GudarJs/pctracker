const net = require('net')
const utils = require('./utils');
const logging = require('./logging');

const app = net.createServer((socket) => {
  socket.name = socket.remoteAddress + ":" + socket.remotePort 
  console.log('CONNECTED ' + socket.name);

  socket.on('data', (data) => {
      console.log('DATA RECEIVED FROM ' + socket.name);
      if (utils.isJSON(data)) {
          data = JSON.parse(data)
          
          logging.isMacAddressActive(data.mac_address, (result) => {
            let response = null
            if (result) {
              response = 'OK'
            } else {    
              response = 'DELETE'  
            }
            logging.loggingPing(data.mac_address, response)
            socket.write(response)
          })
      }
  });

  socket.on('end', () => {
    console.log('CLOSED: ' + socket.name)
  });
});

app.on('error', (err) => {
  throw err;
});

module.exports = app;
