const net = require('net');
// this help with getting the user input from the CLI
const inquirer = require('inquirer');
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const delay = require('delay');

client.connect(PORT, HOST, () => {
  console.log('Client Connected');
  let name = 'driver';
  const messages = []; //optional
  client.on('data', async (data) => {
    // console.log('What we got from the server', data, JSON.parse(data));
    const event = JSON.parse(data);
    if (event.event === 'pickup') {
      await delay(1000);
      // messages.push(event.payload);
      sendMessage('in-transit',event.payload);
      console.log(`picking up${event.payload}`);
      // console.clear();
      await delay(1000);
      sendMessage('delivered',event.payload);
      // messages.forEach((message) => {
      //   // message.sender === name
      //   //   ? console.log('\x1b[34m', message.message)
      //   //   : console.log('\x1b[31m', message.message);
      //   console.log(message);
      // });
      console.log(''); //this will add empty line after the message
    }
  });
  function sendMessage(eve,text) {
    // [mahmoud]: hi
    const message = `{"${name}":"${text}"}`; //===> [name]: text
    const event = JSON.stringify({ event: eve, payload: message });
    // const event = JSON.stringify({
    //   event: 'message',
    //   payload: { message, sender: name },
    // });
    client.write(event);
  }
  // async function getInput() {
  //   const input = await inquirer.prompt([{ name: 'text', message: ' ' }]);
  //   sendMessage(input.text);
  //   getInput();
  // }
  // async function getName() {
  //   console.clear();
  //   const input = await inquirer.prompt([
  //     { name: 'name', message: 'what is your name?' },
  //   ]);
  //   name = input.name;
  // }
  // getName();
  // getInput();
});

client.on('error', (err) => console.log('Client Error ', err.message));
