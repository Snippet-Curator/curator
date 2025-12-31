/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_yirkdTS2kY` ON `notes` (\n  `title`,\n  `added`\n)",
      "CREATE INDEX `idx_notes_notebook_created` ON `notes` (\n  `notebook`,\n  `created` DESC\n)"
    ]
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // update collection data
  unmarshal({
    "indexes": [
      "CREATE UNIQUE INDEX `idx_yirkdTS2kY` ON `notes` (\n  `title`,\n  `added`\n)"
    ]
  }, collection)

  return app.save(collection)
})
