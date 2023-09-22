const { move, pickUp } = require('./main.js');

test('Cannot move north from Kitchen without lock pick and book', () => {
  const currentRoom = {
    _name: 'Kitchen'
  };
  const inventory = ['lock pick'];
  const direction = 'north';
  expect(move(currentRoom, inventory, direction)).toBe(currentRoom);
})