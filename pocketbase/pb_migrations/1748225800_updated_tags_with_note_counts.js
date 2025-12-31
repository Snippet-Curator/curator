/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2184080649")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    tags.parent,\n    COUNT(DISTINCT filtered_notes.id) AS note_count\nFROM tags\nLEFT JOIN (\n    SELECT notes.id, json_each.value as tag_id\n    FROM notes\n    JOIN notebooks ON notes.notebook = notebooks.id\n    JOIN json_each(notes.tags) \n    WHERE notebooks.name NOT IN ('Trash', 'Archive')\n) filtered_notes ON filtered_notes.tag_id = tags.id\nGROUP BY tags.id, tags.name, tags.parent"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_Rwuu")

  // remove field
  collection.fields.removeById("_clone_CLVr")

  // remove field
  collection.fields.removeById("json3771328437")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_f5a0",
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
    "collectionId": "pbc_1219621782",
    "hidden": false,
    "id": "_clone_8MyB",
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

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_2184080649")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    tags.parent,\n    (\n        SELECT COUNT(DISTINCT notes.id) \n        FROM notes\n        JOIN notebooks ON notes.notebook = notebooks.id\n        JOIN json_each(notes.tags) \n        WHERE json_each.value = tags.id\n          AND notebooks.name NOT IN ('Trash', 'Archive')\n    ) AS note_count\nFROM tags"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_Rwuu",
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
    "collectionId": "pbc_1219621782",
    "hidden": false,
    "id": "_clone_CLVr",
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
    "hidden": false,
    "id": "json3771328437",
    "maxSize": 1,
    "name": "note_count",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // remove field
  collection.fields.removeById("_clone_f5a0")

  // remove field
  collection.fields.removeById("_clone_8MyB")

  // remove field
  collection.fields.removeById("number3771328437")

  return app.save(collection)
})
