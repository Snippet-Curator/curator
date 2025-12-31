/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // add field
  collection.fields.addAt(18, new Field({
    "hidden": false,
    "id": "json3529336306",
    "maxSize": 0,
    "name": "sources",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date2908104539",
    "max": "",
    "min": "",
    "name": "last_opened",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // remove field
  collection.fields.removeById("json3529336306")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "date2908104539",
    "max": "",
    "min": "",
    "name": "opened",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "date"
  }))

  return app.save(collection)
})
