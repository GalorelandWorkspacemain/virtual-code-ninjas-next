// highscore.test.js
const path = require('path')
const fs = require('fs')
const HS = require(path.resolve(__dirname, '../student-templates/highscore.js'))

const SCOREFILE = path.resolve('scores.json')

beforeEach(() => {
  if (fs.existsSync(SCOREFILE)) fs.unlinkSync(SCOREFILE)
})

afterEach(() => {
  if (fs.existsSync(SCOREFILE)) fs.unlinkSync(SCOREFILE)
})

test('save and load scores, highest first', () => {
  HS.saveScore('Sam', 120)
  HS.saveScore('Lee', 150)
  const scores = HS.loadScores()
  expect(scores.length).toBeGreaterThanOrEqual(2)
  expect(scores[0].score).toBeGreaterThanOrEqual(scores[1].score)
})
