const expect = require('chai').expect;

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    const [from, text] = ['david@example.com', 'Here is some example text'];
    const message = generateMessage(from, text);

    expect(message.createdAt).to.be.a('number');
    expect(message).to.include({ from, text });
  });
});

describe('generateLocationMessage', () => {
  it('should generate the correct location object', () => {
    const [from, lat, lng, url] = ['Admin', 36, -86, 'http://www.google.com/maps/@36,-86'];
    const message = generateLocationMessage(from, lat, lng);

    expect(message.createdAt).to.be.a('number');
    expect(message).to.include({ from, url });
  });
});