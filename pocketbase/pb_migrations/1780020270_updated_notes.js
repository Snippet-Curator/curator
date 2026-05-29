/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // add field
  collection.fields.addAt(22, new Field({
    "help": "",
    "hidden": false,
    "id": "bool1137015140",
    "name": "is_shared",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "bool"
  }))

  // add field
  collection.fields.addAt(23, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "text3596176854",
    "max": 0,
    "min": 0,
    "name": "share_token",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // remove field
  collection.fields.removeById("bool1137015140")

  // remove field
  collection.fields.removeById("text3596176854")

  return app.save(collection)
})
