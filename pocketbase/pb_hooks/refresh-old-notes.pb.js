onBootstrap((e) => {
  e.next()
  const calculateNoteScore = require(`${__hooks}/utils.js`).calculateNoteScore
  const findSettingbyName = require(`${__hooks}/utils.js`).findSettingbyName

  const ratingWeight = findSettingbyName('ratingWeight') ?? 0
  const recencyWeight = findSettingbyName('recencyWeight') ?? 0
  const weightWeight = findSettingbyName('weightWeight') ?? 0
  const randomWeight = findSettingbyName('randomWeight') ?? 0
  const maxDay = findSettingbyName('maxDay') ?? 60
  const fullPenaltyWindow = findSettingbyName('fullPenaltyWindow') ?? 0
  const decayWindow = findSettingbyName('decayWindow') ?? 0
  const daysOld = findSettingbyName('daysOld') ?? 0
  const scoreRefreshHour = findSettingbyName('scoreRefreshHour') ?? 0

  function updateNotes() {
    const cutoff = new Date(Date.now() - daysOld * 86400000).toISOString()
    const today = new Date(Date.now()).toISOString()
    const before = new Date()

    const notes = arrayOf(
      new DynamicModel({
        id: '',
        title: '',
        last_opened: '',
        last_score_updated: '',
        weight: 0,
        score: 0,
        rating: 0
      })
    )

    try {
      e.app
        .db()
        .newQuery(
          'SELECT id, title, rating, weight, last_score_updated, last_opened FROM notes WHERE last_score_updated < {:cutoff}'
        )
        .bind({
          cutoff: cutoff
        })
        .all(notes)
    } catch (err) {
      console.error(`No notes found: ${err.message}`)
    }

    for (const note of notes) {
      const newScore = calculateNoteScore(
        note.rating,
        note.weight,
        note.last_opened,
        ratingWeight,
        recencyWeight,
        weightWeight,
        randomWeight,
        maxDay,
        fullPenaltyWindow,
        decayWindow
      )

      e.app
        .db()
        .newQuery(
          `UPDATE notes SET score = {:newScore}, last_score_updated = {:today} WHERE id = {:id}`
        )
        .bind({
          id: note.id,
          newScore: newScore,
          today: today
        })
        .execute()
    }
    const after = new Date()

    console.log(`Updated scores for ${notes.length} notes in ${after - before} ms`)
  }

  updateNotes()

  if (scoreRefreshHour != 0) {
    cronAdd('scheduled-score-updates', `0 */${scoreRefreshHour} * * *`, () => {
      const calculateNoteScore = require(`${__hooks}/utils.js`).calculateNoteScore
      const findSettingbyName = require(`${__hooks}/utils.js`).findSettingbyName

      const ratingWeight = findSettingbyName('ratingWeight') ?? 0
      const recencyWeight = findSettingbyName('recencyWeight') ?? 0
      const weightWeight = findSettingbyName('weightWeight') ?? 0
      const randomWeight = findSettingbyName('randomWeight') ?? 0
      
      const maxDay = findSettingbyName('maxDay') ?? 0
      const fullPenaltyWindow = findSettingbyName('fullPenaltyWindow') ?? 0
      const decayWindow = findSettingbyName('decayWindow') ?? 0
      const daysOld = findSettingbyName('daysOld') ?? 0

      const cutoff = new Date(Date.now() - daysOld * 86400000).toISOString()
      const today = new Date(Date.now()).toISOString()
      const before = new Date()

      const notes = arrayOf(
        new DynamicModel({
          id: '',
          title: '',
          last_opened: '',
          last_score_updated: '',
          weight: 0,
          score: 0,
          rating: 0
        })
      )

      try {
        $app
          .db()
          .newQuery(
            'SELECT id, title, rating, weight, last_score_updated, last_opened FROM notes WHERE last_score_updated < {:cutoff}'
          )
          .bind({
            cutoff: cutoff
          })
          .all(notes)
      } catch (err) {
        console.error(`No notes found: ${err.message}`)
      }

      for (const note of notes) {
        const newScore = calculateNoteScore(
          note.rating,
          note.weight,
          note.last_opened,
          ratingWeight,
          recencyWeight,
          weightWeight,
          randomWeight,
          maxDay,
          fullPenaltyWindow,
          decayWindow
        )

        $app
          .db()
          .newQuery(
            `UPDATE notes SET score = {:newScore}, last_score_updated = {:today} WHERE id = {:id}`
          )
          .bind({
            id: note.id,
            newScore: newScore,
            today: today
          })
          .execute()
      }
      const after = new Date()

      console.log(`Updated scores for ${notes.length} notes in ${after - before} ms`)
    })
  }
})
