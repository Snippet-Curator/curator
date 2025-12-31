/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_yirkdTS2kY` ON `notes` (\n  `title`,\n  `added`\n)",
      "CREATE INDEX `idx_notes_notebook_created` ON `notes` (\n  `status`,\n  `created` DESC\n)",
      "CREATE INDEX `idx_4NuxBc5Iu6` ON `notes` (`created` DESC)",
      "CREATE INDEX `idx_Ul1ojw2TsH` ON `notes` (\n  `status`,\n  `score` DESC\n)",
      "CREATE INDEX `idx_tDPjn8lzAd` ON `notes` (`created`)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_yirkdTS2kY` ON `notes` (\n  `title`,\n  `added`\n)",
      "CREATE INDEX `idx_notes_notebook_created` ON `notes` (\n  `status`,\n  `created` DESC\n)",
      "CREATE INDEX `idx_4NuxBc5Iu6` ON `notes` (`created` DESC)",
      "CREATE INDEX `idx_Ul1ojw2TsH` ON `notes` (`score` DESC)",
      "CREATE INDEX `idx_tDPjn8lzAd` ON `notes` (`created`)"
    ]
  }, collection)

  return app.save(collection)
})
