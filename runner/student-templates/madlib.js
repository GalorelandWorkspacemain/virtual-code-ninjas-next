// madlib.js

function makeStory(inputs = {}) {
  const name = inputs.name || 'Friend'
  const color = inputs.color || 'colorful'
  const animal = inputs.animal || 'creature'
  return `Once upon a time, ${name} found a ${color} ${animal} in the garden.`
}

module.exports = { makeStory }
