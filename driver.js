'use strict';
const events = require('./events.js');
const delay = require('delay');
events.on('pickup', (payload) => doPickup('pickup', payload));
// function wait1s() {
//   setTimeout(function() {

//   }, 1000);
// }
// function wait3s() {
//   setTimeout(function() {

//   }, 3000);
// }

async function doPickup(event, payload) {
  await delay(1000);
  console.log(`DRIVER: picked up ${payload.orderId}`);
  events.emit('in-transit', payload);
  await delay(3000);
  console.log('delivered');
  events.emit('delivered', payload);
}