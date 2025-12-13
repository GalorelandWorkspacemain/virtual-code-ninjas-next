function greet() { 
  return "hello" 
}

function makeStory(words) {
  const { name = 'Someone', color = 'colorful', animal = 'creature' } = words;
  return `Once upon a time, ${name} found a ${color} ${animal}.`;
}

module.exports = { greet, makeStory };