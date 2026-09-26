/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_2184080649")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    tags.user as user,\n    COUNT(DISTINCT filtered_notes.id) AS note_count\nFROM tags\nLEFT JOIN (\n    SELECT notes.id, json_each.value as tag_id\n    FROM notes\n    JOIN notebooks ON notes.notebook = notebooks.id\n    JOIN json_each(notes.tags) \n    WHERE notes.status IN ('active')\n) filtered_notes ON filtered_notes.tag_id = tags.id\nGROUP BY tags.id, tags.name, tags.parent, tags.status"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_JRru")

  // remove field
  collection.fields.removeById("_clone_3lPC")

  // remove field
  collection.fields.removeById("_clone_nYgs")

  // remove field
  collection.fields.removeById("_clone_oh24")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_yWmz",
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
    "id": "_clone_PdIw",
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
  const collection = app.findCollectionByNameOrId("pbc_2184080649")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    tags.id, \n    tags.name, \n    tags.parent,\n    tags.status,\n    tags.user as user,\n    COUNT(DISTINCT filtered_notes.id) AS note_count\nFROM tags\nLEFT JOIN (\n    SELECT notes.id, json_each.value as tag_id\n    FROM notes\n    JOIN notebooks ON notes.notebook = notebooks.id\n    JOIN json_each(notes.tags) \n    WHERE notes.status IN ('active')\n) filtered_notes ON filtered_notes.tag_id = tags.id\nGROUP BY tags.id, tags.name, tags.parent, tags.status"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_JRru",
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
    "help": "",
    "hidden": false,
    "id": "_clone_3lPC",
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
    "help": "",
    "hidden": false,
    "id": "_clone_nYgs",
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

  // add field
  collection.fields.addAt(4, new Field({
    "cascadeDelete": true,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_oh24",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_yWmz")

  // remove field
  collection.fields.removeById("_clone_PdIw")

  return app.save(collection)
})
