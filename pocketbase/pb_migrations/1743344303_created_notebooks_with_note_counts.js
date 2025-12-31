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
        "id": "_clone_jNBt",
        "max": 0,
        "min": 0,
        "name": "name",
        "pattern": "",
        "presentable": false,
        "primaryKey": false,
        "required": false,
        "system": false,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3547311433",
        "hidden": false,
        "id": "_clone_6Cvg",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "parent",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
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
    "id": "pbc_1945936632",
    "indexes": [],
    "listRule": null,
    "name": "notebooks_with_note_counts",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n    notebooks.id, \n    notebooks.name, \n    notebooks.parent,\n    COUNT(notes.id) AS note_count\nFROM notebooks\nLEFT JOIN notes ON notes.notebook = notebooks.id\nGROUP BY notebooks.id, notebooks.name",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1945936632");

  return app.delete(collection);
})
