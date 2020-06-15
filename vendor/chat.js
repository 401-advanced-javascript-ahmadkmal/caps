const net = require('net');
// this help with getting the user input from the CLI
// const inquirer = require('inquirer');
const faker = require('faker');
const delay = require('delay');
require('dotenv').config();
const client = new net.Socket();
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 3000;
const storeName = process.env.storeName||'ahmadStore';

client.connect(PORT, HOST, () => {
  console.log('Client Connected');
  let name = 'Vendor';
  // const messages = []; //optional
  client.on('data', (data) => {
    // console.log('What we got from the server----------->', data, JSON.parse(data));
    const event = JSON.parse(data);
    // const obj =JSON.parse(event.payload);
    // console.log('data received at vendor parse ----------->',obj);
    if (event.event === 'delivered') {
      let messages=(`thank you for delivering ${event.payload}`);

      // console.log(event.payload);
      // console.clear();
     
        // message.sender === name
        //   ? console.log('\x1b[34m', message.message)
        //   : console.log('\x1b[31m', message.message);
        console.log(messages);
   
      console.log(''); //this will add empty line after the message
    }
  });
  function sendMessage(text) {
    // [mahmoud]: hi
    const message = `{"${name}":"${text}"}`; //===> [name]: text
    const event = JSON.stringify({ event: 'pickup', payload: message });
    // const event = JSON.stringify({
    //   event: 'message',
    //   payload: { message, sender: name },
    // });
    client.write(event);
  }
  async function genInput() {
    // const input = await inquirer.prompt([{ name: 'text', message: ' ' }]);
    const fakeOrder={storeName:storeName, orderId:faker.random.uuid(), customerName:faker.name.findName(), address:faker.address.streetAddress()};
  
    sendMessage(fakeOrder);
    await delay(5000);
    genInput();
  }
  // async function getName() {
  //   console.clear();
  //   const input = await inquirer.prompt([
  //     { name: 'name', message: 'what is your name?' },
  //   ]);
  //   name = input.name;
  // }
  
  genInput();
});

client.on('error', (err) => console.log('Client Error ', err.message));
