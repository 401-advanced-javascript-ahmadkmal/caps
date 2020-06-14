'use strict';
const events = require('./events.js');
const faker = require('faker');
const delay = require('delay');
require('dotenv').config();
const storeName = process.env.storeName||'ahmadStore';
events.on('delivered', () => logIt());
// function wait5s() {
//   setTimeout(function() {

//   }, 5000);
// }
function logIt() {
  console.log('thank you');
}
// async function wait5s(){
//   await delay(5000);
// }
// eslint-disable-next-line no-constant-condition
async function loop(){
  // console.log('before 5s');
  await delay(5000);
  // console.log('after 5s');
  const fakeOrder={storeName:storeName, orderId:faker.random.uuid(), customerName:faker.name.findName(), address:faker.address.streetAddress()};
  // console.log('faker',fakeOrder);
  events.emit('pickup', fakeOrder);
  loop();
}
loop();


    



