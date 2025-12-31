/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_851678412")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.thumbnail,\n    notes.score\nFROM notes"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_AW2b")

  // remove field
  collection.fields.removeById("_clone_EUrk")

  // remove field
  collection.fields.removeById("_clone_HsXs")

  // remove field
  collection.fields.removeById("_clone_aAXf")

  // remove field
  collection.fields.removeById("_clone_cnSM")

  // remove field
  collection.fields.removeById("_clone_jL0j")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_bwDM",
    "max": 0,
    "min": 0,
    "name": "title",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1219621782",
    "hidden": false,
    "id": "_clone_zCTD",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3547311433",
    "hidden": false,
    "id": "_clone_vtDX",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "notebook",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_Zj3p",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_tSHx",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "_clone_vzza",
    "name": "thumbnail",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_lul9",
    "max": null,
    "min": null,
    "name": "score",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_851678412")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.thumbnail\nFROM notes"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_AW2b",
    "max": 0,
    "min": 0,
    "name": "title",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(2, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_1219621782",
    "hidden": false,
    "id": "_clone_EUrk",
    "maxSelect": 999,
    "minSelect": 0,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(3, new Field({
    "cascadeDelete": false,
    "collectionId": "pbc_3547311433",
    "hidden": false,
    "id": "_clone_HsXs",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "notebook",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  }))

  // add field
  collection.fields.addAt(4, new Field({
    "hidden": false,
    "id": "_clone_aAXf",
    "name": "created",
    "onCreate": true,
    "onUpdate": false,
    "presentable": false,
    "system": false,
    "type": "autodate"
  }))

  // add field
  collection.fields.addAt(5, new Field({
    "convertURLs": false,
    "hidden": false,
    "id": "_clone_cnSM",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "_clone_jL0j",
    "name": "thumbnail",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // remove field
  collection.fields.removeById("_clone_bwDM")

  // remove field
  collection.fields.removeById("_clone_zCTD")

  // remove field
  collection.fields.removeById("_clone_vtDX")

  // remove field
  collection.fields.removeById("_clone_Zj3p")

  // remove field
  collection.fields.removeById("_clone_tSHx")

  // remove field
  collection.fields.removeById("_clone_vzza")

  // remove field
  collection.fields.removeById("_clone_lul9")

  return app.save(collection)
})
