const events = require('../events.js');
require('../caps');
const faker = require('faker');
describe('caps', () => {
  let consoleSpy=jest.fn();
  const payload={storeName:'storeName', orderId:faker.random.uuid(), customerName:faker.name.findName(), address:faker.address.streetAddress()};
  beforeEach(() => {
    consoleSpy = jest.spyOn(console, 'log').mockImplementation();
  });
  afterEach(() => {
    consoleSpy.mockRestore();
  });

  it('logs the output by pickup', () => {
    events.emit('pickup', payload);
    const time = new Date();
    expect(consoleSpy).toHaveBeenCalledWith({event:'pickup',time ,payload});
  });
  it('logs the output by in-transit', () => {
    events.emit('in-transit', payload);
    const time = new Date();
    expect(consoleSpy).toHaveBeenCalledWith({event:'in-transit',time ,payload});
  });
  it('logs the output by delivered', () => {
    events.emit('delivered', payload);
    const time = new Date();
    expect(consoleSpy).toHaveBeenCalledWith({event:'delivered',time ,payload});
  });

});