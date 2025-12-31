function normalizeRating(val, min, max) {
  if (val === 0) return 0.5
  return Math.max(0, Math.min(1, (val - min) / (max - min)))
}

function normalizeWeight(val, min, max) {
  return Math.max(0, Math.min(1, (val - min) / (max - min)))
}

function recencyScore(lastOpened, maxDay) {
  const openedDate = new Date(lastOpened)
  if (isNaN(openedDate.getTime())) {
    return 0.1 + Math.random() * 0.9
  }
  const daysAgo = (Date.now() - openedDate.getTime()) / (1000 * 60 * 60 * 24)

  // Clamp to range
  const clamped = Math.min(daysAgo, maxDay)

  if (maxDay === 0) return 0

  // Cubic easing in: slow start, faster end
  const normalized = clamped / maxDay
  const score = Math.pow(normalized, 3) // change exponent to control curve shape, lower 2 = gentle curve, 4+ = slow start and sharp end

  return score
}

function findSettingbyName(name) {
  try {
    const record = $app.findFirstRecordByData('settings', 'name', name)
    return record.getFloat('value')
  } catch (e) {
    console.error('Error getting setting: ', name)
    return
  }
}

function recentlySeenPenalty(lastOpened, fullPenaltyWindow, decayWindow) {
  const openedDate = new Date(lastOpened)
  if (isNaN(openedDate.getTime())) return 1 // unrated → no penalty

  const hoursAgo = (Date.now() - openedDate.getTime()) / (1000 * 60 * 60)

  const fullPenalty = 0.1 // cap full penalty at 1%
  if (hoursAgo <= fullPenaltyWindow) return fullPenalty
  if (hoursAgo >= decayWindow) return 1

  // Linearly interpolate from fullPenalty → 1 over decayWindow hours
  const decayProgress = (hoursAgo - fullPenaltyWindow) / decayWindow
  return fullPenalty + decayProgress * (1 - fullPenalty)
}

function calculateNoteScore(
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
) {
  const ratingNorm = normalizeRating(rating ?? 0, 1, 5)
  const recencyNorm = recencyScore(lastOpened ?? new Date(), maxDay)
  const weightNorm = normalizeWeight(weight ?? 0, 0, 10)
  const randomFactor = Math.random() < 0.05 ? 0.8 + Math.random() * 0.2 : Math.random() // 5% chance of random boost, otherwise random.

  const totalWt = ratingWeight + recencyWeight + weightWeight + randomWeight
  const rawScore =
    (ratingWeight * ratingNorm +
      recencyWeight * recencyNorm +
      weightWeight * weightNorm +
      randomWeight * randomFactor) /
    totalWt
  const score = rawScore * recentlySeenPenalty(lastOpened, fullPenaltyWindow, decayWindow) * 100
  return score
}

module.exports = {
  findSettingbyName,
  calculateNoteScore
}
