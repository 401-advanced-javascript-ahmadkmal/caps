const net = require('net');
const uuidv4 = require('uuid').v4;
const PORT = process.env.PORT || 3000;
const server = net.createServer();

server.listen(PORT, () => console.log(`server is up on port ${PORT}`));
const socketPool = {}; // this will store all the connected clients
// on client connection do this
server.on('connection', (socket) => {
  console.log('socket ------>',socket);
  const id = `socket-${uuidv4()}`;
  socketPool[id] = socket;
  // we listen to the data event and we get the buffer of the sent message
  socket.on('data', (buffer) => dispatchEvent(buffer,id));
  // listen on socket error
  socket.on('error', (e) => console.log(`Socket error ${e.message}`));
  //listen on connection end from socket
  socket.on('end', (e) => delete socketPool[id]);
});
// take the string message from the buffer
function dispatchEvent(buffer,id) {
  console.log('Buffer', JSON.parse(buffer));
  const message = JSON.parse(buffer.toString().trim());
  broadcast(message,id);
}
// sending the message to all connected clients
function broadcast(message,id) {
  console.log('Message', message);
  const payload = JSON.stringify(message);
  console.log('Payload', payload);
  for (let socket in socketPool) {
    // emit the message to all the clients
    if(socket!=id){
      socketPool[socket].write(payload); ////////
    }
  }
}
// server error
server.on('error', (e) => console.log('SERVER ERROR', e.message));
