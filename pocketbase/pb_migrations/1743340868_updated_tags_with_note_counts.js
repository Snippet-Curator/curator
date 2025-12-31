/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2184080649")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    (\n        SELECT COUNT(DISTINCT notes.id) \n        FROM notes, json_each(notes.tags) \n        WHERE json_each.value = tags.id\n    ) AS note_count\nFROM tags"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_CVGz")

  // remove field
  collection.fields.removeById("number3771328437")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_KVzm",
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
    "hidden": false,
    "id": "json3771328437",
    "maxSize": 1,
    "name": "note_count",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2184080649")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    COUNT(notes.id) AS note_count\nFROM tags\nLEFT JOIN json_each(notes.tags) AS tag_ids ON tags.id = tag_ids.value\nLEFT JOIN notes ON notes.id = tag_ids.rowid\nGROUP BY tags.id;"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
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
  }))

  // add field
  collection.fields.addAt(2, new Field({
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
  }))

  // remove field
  collection.fields.removeById("_clone_KVzm")

  // remove field
  collection.fields.removeById("json3771328437")

  return app.save(collection)
})
