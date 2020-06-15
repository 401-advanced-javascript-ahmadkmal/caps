const net = require('net');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;

client.connect(PORT, HOST, () => {
  console.log('connected');
  client.on('data', (data) => {
    const event = JSON.parse(data);
    console.log(new Date().toLocaleString(), event.event, event.payload);
  });
  client.on('close', () => console.log('Connection Closed'));
});

client.on('error', (err) => console.log(`logger Client error ${err.message}`));
