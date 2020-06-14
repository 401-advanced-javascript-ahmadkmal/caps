'use strict';
const events = require('./events.js');


function logIt(event, payload) {
  const time = new Date();
  console.log({ event, time, payload });
}
events.on('pickup', (payload) => logIt('pickup', payload));
events.on('in-transit', (payload) => logIt('in-transit', payload));
events.on('delivered', (payload) => logIt('delivered', payload));
require('./driver');
require('./vendor');

