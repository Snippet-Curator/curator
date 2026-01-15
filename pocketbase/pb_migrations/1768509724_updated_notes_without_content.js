/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_851678412")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.id != \"\"",
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.attachments,\n    notes.resources,\n    notes.thumbnail,\n    notes.score,\n    notes.status,\n    notes.user as user\nFROM notes",
    "viewRule": "@request.auth.id != \"\""
  }, collection)

  // remove field
  collection.fields.removeById("_clone_rorr")

  // remove field
  collection.fields.removeById("_clone_6PEK")

  // remove field
  collection.fields.removeById("_clone_EqnU")

  // remove field
  collection.fields.removeById("_clone_bL8M")

  // remove field
  collection.fields.removeById("_clone_fqVA")

  // remove field
  collection.fields.removeById("_clone_eKoN")

  // remove field
  collection.fields.removeById("_clone_IRxd")

  // remove field
  collection.fields.removeById("_clone_TJgJ")

  // remove field
  collection.fields.removeById("_clone_CjMM")

  // remove field
  collection.fields.removeById("_clone_yyWb")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_sGtE",
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
    "id": "_clone_AI0k",
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
    "id": "_clone_rAqw",
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
    "id": "_clone_1Qyh",
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
    "id": "_clone_aF96",
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
    "id": "_clone_Ncvi",
    "maxSelect": 200,
    "maxSize": 1000000000,
    "mimeTypes": [],
    "name": "attachments",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "500x0",
      "200x0"
    ],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_4TFA",
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
    "id": "_clone_cGw3",
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
    "id": "_clone_4u0n",
    "max": null,
    "min": null,
    "name": "score",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_DjNY",
    "max": 0,
    "min": 0,
    "name": "status",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // add field
  collection.fields.addAt(11, new Field({
    "cascadeDelete": true,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": "_clone_N17r",
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
  const collection = app.findCollectionByNameOrId("pbc_851678412")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.attachments,\n    notes.resources,\n    notes.thumbnail,\n    notes.score,\n    notes.status\nFROM notes",
    "viewRule": null
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_rorr",
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
    "id": "_clone_6PEK",
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
    "id": "_clone_EqnU",
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
    "id": "_clone_bL8M",
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
    "id": "_clone_fqVA",
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
    "id": "_clone_eKoN",
    "maxSelect": 200,
    "maxSize": 1000000000,
    "mimeTypes": [],
    "name": "attachments",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [
      "500x0",
      "200x0"
    ],
    "type": "file"
  }))

  // add field
  collection.fields.addAt(7, new Field({
    "hidden": false,
    "id": "_clone_IRxd",
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
    "id": "_clone_TJgJ",
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
    "id": "_clone_CjMM",
    "max": null,
    "min": null,
    "name": "score",
    "onlyInt": false,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "_clone_yyWb",
    "max": 0,
    "min": 0,
    "name": "status",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": true,
    "system": false,
    "type": "text"
  }))

  // remove field
  collection.fields.removeById("_clone_sGtE")

  // remove field
  collection.fields.removeById("_clone_AI0k")

  // remove field
  collection.fields.removeById("_clone_rAqw")

  // remove field
  collection.fields.removeById("_clone_1Qyh")

  // remove field
  collection.fields.removeById("_clone_aF96")

  // remove field
  collection.fields.removeById("_clone_Ncvi")

  // remove field
  collection.fields.removeById("_clone_4TFA")

  // remove field
  collection.fields.removeById("_clone_cGw3")

  // remove field
  collection.fields.removeById("_clone_4u0n")

  // remove field
  collection.fields.removeById("_clone_DjNY")

  // remove field
  collection.fields.removeById("_clone_N17r")

  return app.save(collection)
})
