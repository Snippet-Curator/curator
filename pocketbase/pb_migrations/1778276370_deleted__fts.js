/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1528990910");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "select4232930610",
        "maxSelect": 1,
        "name": "collection",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "select",
        "values": [
          "notebooks",
          "notebooks_with_note_counts",
          "notes",
          "notes_without_content",
          "rating_score_summary",
          "settings",
          "tags",
          "tags_with_note_counts",
          "users"
        ]
      },
      {
        "hidden": false,
        "id": "json2128995208",
        "maxSize": 0,
        "name": "fields",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "json"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text214868295",
        "max": 0,
        "min": 0,
        "name": "tokenizer",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      }
    ],
    "id": "pbc_1528990910",
    "indexes": [
      "CREATE UNIQUE INDEX `idx_k548G4ctcg` ON `_fts` (`collection`)"
    ],
    "listRule": null,
    "name": "_fts",
    "system": false,
    "type": "base",
    "updateRule": null,
    "viewRule": null
  });

  return app.save(collection);
})
