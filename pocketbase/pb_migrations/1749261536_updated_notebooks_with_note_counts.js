/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1945936632")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notebooks.id, \n    notebooks.name, \n    notebooks.parent,\n    COUNT(notes.id) AS note_count\nFROM notebooks\nLEFT JOIN notes ON notes.notebook = notebooks.id WHERE notes.status IN ('active')\nGROUP BY notebooks.id, notebooks.name, notebooks.parent"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_lk8W")

  // remove field
  collection.fields.removeById("_clone_63V4")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Tyqp",
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
    "cascadeDelete": false,
    "collectionId": "pbc_3547311433",
    "hidden": false,
    "id": "_clone_LG1A",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "parent",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1945936632")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notebooks.id, \n    notebooks.name, \n    notebooks.parent,\n    COUNT(notes.id) AS note_count\nFROM notebooks\nLEFT JOIN notes ON notes.notebook = notebooks.id\nGROUP BY notebooks.id, notebooks.name, notebooks.parent"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_lk8W",
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
    "cascadeDelete": false,
    "collectionId": "pbc_3547311433",
    "hidden": false,
    "id": "_clone_63V4",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "parent",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_Tyqp")

  // remove field
  collection.fields.removeById("_clone_LG1A")

  return app.save(collection)
})
