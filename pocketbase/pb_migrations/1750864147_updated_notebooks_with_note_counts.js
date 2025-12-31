/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_1945936632")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notebooks.id, \n    notebooks.name, \n    notebooks.parent,\n    notebooks.status,\n    COUNT(notes.id) AS note_count\nFROM notebooks\nLEFT JOIN notes \n  ON notes.notebook = notebooks.id \n  AND notes.status IN ('active')\nGROUP BY notebooks.id, notebooks.name, notebooks.parent, notebooks.status"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_lgLi")

  // remove field
  collection.fields.removeById("_clone_opgk")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_6Oiu",
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
    "id": "_clone_hUBC",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "parent",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_lN3e",
    "max": 0,
    "min": 0,
    "name": "status",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_1945936632")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notebooks.id, \n    notebooks.name, \n    notebooks.parent,\n    COUNT(notes.id) AS note_count\nFROM notebooks\nLEFT JOIN notes \n  ON notes.notebook = notebooks.id \n  AND notes.status IN ('active')\nGROUP BY notebooks.id, notebooks.name, notebooks.parent"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_lgLi",
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
    "id": "_clone_opgk",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "parent",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_6Oiu")

  // remove field
  collection.fields.removeById("_clone_hUBC")

  // remove field
  collection.fields.removeById("_clone_lN3e")

  return app.save(collection)
})
