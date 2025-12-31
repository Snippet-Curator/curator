onRecordUpdateRequest((e) => {
  const calculateNoteScore = require(`${__hooks}/utils.js`).calculateNoteScore
  const findSettingbyName = require(`${__hooks}/utils.js`).findSettingbyName

  const ratingWeight = findSettingbyName('ratingWeight') ?? 0
  const recencyWeight = findSettingbyName('recencyWeight') ?? 0
  const weightWeight = findSettingbyName('weightWeight') ?? 0
  const randomWeight = findSettingbyName('randomWeight') ?? 0
  const maxDay = findSettingbyName('maxDay') ?? 60
  const fullPenaltyWindow = findSettingbyName('fullPenaltyWindow') ?? 0
  const decayWindow = findSettingbyName('decayWindow') ?? 0
  const scoreRefreshHour = findSettingbyName('scoreRefreshHour') ?? 0

  const rating = e.record.get('rating')
  const weight = e.record.get('weight')
  const lastOpened = e.record.get('last_opened')

  const recordScore = calculateNoteScore(
    rating,
    weight,
    lastOpened,
    ratingWeight,
    recencyWeight,
    weightWeight,
    randomWeight,
    maxDay,
    fullPenaltyWindow,
    decayWindow
  )

  e.record.set('score', recordScore)
  e.next()
}, 'notes')
