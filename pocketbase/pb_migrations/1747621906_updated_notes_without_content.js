/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_851678412")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.attachments,\n    notes.resources,\n    notes.thumbnail,\n    notes.score\nFROM notes"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_LXud")

  // remove field
  collection.fields.removeById("_clone_LfHV")

  // remove field
  collection.fields.removeById("_clone_JwYB")

  // remove field
  collection.fields.removeById("_clone_PWrp")

  // remove field
  collection.fields.removeById("_clone_IuVz")

  // remove field
  collection.fields.removeById("_clone_OSRC")

  // remove field
  collection.fields.removeById("_clone_VCIX")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_83Op",
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
    "id": "_clone_mVkW",
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
    "id": "_clone_aLBF",
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
    "id": "_clone_2DnU",
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
    "id": "_clone_cnE7",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "_clone_Vpt3",
    "maxSelect": 200,
    "maxSize": 1000000000,
    "mimeTypes": [],
    "name": "attachments",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "500x0"
    ],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_pV5j",
    "maxSize": 0,
    "name": "resources",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "exceptDomains": null,
    "hidden": false,
    "id": "_clone_Fr5b",
    "name": "thumbnail",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "_clone_08E9",
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
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.thumbnail,\n    notes.score\nFROM notes"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_LXud",
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
    "id": "_clone_LfHV",
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
    "id": "_clone_JwYB",
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
    "id": "_clone_PWrp",
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
    "id": "_clone_IuVz",
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
    "id": "_clone_OSRC",
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
    "id": "_clone_VCIX",
    "max": null,
    "min": null,
    "name": "score",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // remove field
  collection.fields.removeById("_clone_83Op")

  // remove field
  collection.fields.removeById("_clone_mVkW")

  // remove field
  collection.fields.removeById("_clone_aLBF")

  // remove field
  collection.fields.removeById("_clone_2DnU")

  // remove field
  collection.fields.removeById("_clone_cnE7")

  // remove field
  collection.fields.removeById("_clone_Vpt3")

  // remove field
  collection.fields.removeById("_clone_pV5j")

  // remove field
  collection.fields.removeById("_clone_Fr5b")

  // remove field
  collection.fields.removeById("_clone_08E9")

  return app.save(collection)
})
