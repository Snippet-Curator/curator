/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // update field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "number130897217",
    "max": 10,
    "min": 0,
    "name": "weight",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3395098727")

  // update field
  collection.fields.addAt(15, new Field({
    "hidden": false,
    "id": "number130897217",
    "max": null,
    "min": null,
    "name": "weight",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
})
