/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1945936632")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notebooks.id, \n\tnotebooks.name, \n    notebooks.user as user,\n    COUNT(notes.id) AS note_count\nFROM notebooks\nLEFT JOIN notes \n  ON notes.notebook = notebooks.id \n  AND notes.status IN ('active')\nGROUP BY notebooks.id"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_9aTy")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_5yye",
    "max": 0,
    "min": 0,
    "name": "name",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": true,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_WsUs",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1945936632")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notebooks.id, \n    notebooks.user as user,\n    COUNT(notes.id) AS note_count\nFROM notebooks\nLEFT JOIN notes \n  ON notes.notebook = notebooks.id \n  AND notes.status IN ('active')\nGROUP BY notebooks.id"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "cascadeDelete": true,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_9aTy",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_5yye")

  // remove field
  collection.fields.removeById("_clone_WsUs")

  return app.save(collection)
})
