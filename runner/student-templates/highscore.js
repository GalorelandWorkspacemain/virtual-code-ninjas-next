// highscore.js
const fs = require('fs')
const SCOREFILE = 'scores.json'

function saveScore(name, score) {
  let scores = []
  try {
    if (fs.existsSync(SCOREFILE)) {
      scores = JSON.parse(fs.readFileSync(SCOREFILE, 'utf8') || '[]')
    }
  } catch (e) {
    scores = []
  }
  scores.push({ name, score })
  scores = scores.sort((a, b) => b.score - a.score).slice(0, 10)
  fs.writeFileSync(SCOREFILE, JSON.stringify(scores), 'utf8')
}

function loadScores() {
  try {
    if (!fs.existsSync(SCOREFILE)) return []
    return JSON.parse(fs.readFileSync(SCOREFILE, 'utf8') || '[]')
  } catch (e) {
    return []
  }
}

module.exports = { saveScore, loadScores }
