/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2184080649")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    tags.parent,\n    (\n        SELECT COUNT(DISTINCT notes.id) \n        FROM notes\n        JOIN notebooks ON notes.notebook = notebooks.id\n        JOIN json_each(notes.tags) \n        WHERE json_each.value = tags.id\n          AND notebooks.name NOT IN ('Trash', 'Archive')\n    ) AS note_count\nFROM tags"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_NzLd")

  // remove field
  collection.fields.removeById("_clone_x6dX")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_mjNf",
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
    "id": "_clone_sbRo",
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
  const collection = app.findCollectionByNameOrId("pbc_2184080649")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    tags.parent,\n    (\n        SELECT COUNT(DISTINCT notes.id) \n        FROM notes\n        JOIN notebooks ON notes.notebook = notebooks.id\n        JOIN json_each(notes.tags) \n        WHERE json_each.value = tags.id\n          AND notebooks.name != 'Trash'\n    ) AS note_count\nFROM tags"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_NzLd",
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
    "id": "_clone_x6dX",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "parent",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_mjNf")

  // remove field
  collection.fields.removeById("_clone_sbRo")

  return app.save(collection)
})
