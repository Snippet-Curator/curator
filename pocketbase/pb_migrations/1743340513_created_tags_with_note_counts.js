/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "_clone_CVGz",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": true,
        "system": false,
        "type": "text"
      },
      {
        "hidden": false,
        "id": "number3771328437",
        "max": null,
        "min": null,
        "name": "note_count",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      }
    ],
    "id": "pbc_2184080649",
    "indexes": [],
    "listRule": null,
    "name": "tags_with_note_counts",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    COUNT(notes.id) AS note_count\nFROM tags\nLEFT JOIN json_each(notes.tags) AS tag_ids ON tags.id = tag_ids.value\nLEFT JOIN notes ON notes.id = tag_ids.rowid\nGROUP BY tags.id;",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2184080649");

  return app.delete(collection);
})
