// madlib.test.js
const path = require('path')
const madlib = require(path.resolve(__dirname, '../student-templates/madlib.js'))

test('exports makeStory function', () => {
  expect(typeof madlib.makeStory).toBe('function')
})

test('story contains input words', () => {
  const s = madlib.makeStory({ name: 'Alex', color: 'blue', animal: 'cat' })
  expect(typeof s).toBe('string')
  expect(s).toMatch(/Alex/)
  expect(s).toMatch(/blue/)
  expect(s).toMatch(/cat/)
})

test('does not crash on empty inputs', () => {
  const s = madlib.makeStory({})
  expect(typeof s).toBe('string')
})
