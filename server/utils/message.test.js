const expect = require('chai').expect;

const { generateMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate object with from and text', () => {
    const from = 'david@example.com';
    const text = 'Here is some example text';
    const message = generateMessage(from, text);

    expect(message.createdAt).to.be.a('number');
    expect(message).to.include({ from, text });
  });
});