/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_851678412")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.attachments,\n\tnotes.sources,\n    notes.resources,\n    notes.thumbnail,\n    notes.score,\n    notes.status,\n    notes.user as user\nFROM notes"
  }, collection)

  // remove field
  collection.fields.removeById("_clone_RFym")

  // remove field
  collection.fields.removeById("_clone_1tVc")

  // remove field
  collection.fields.removeById("_clone_KNMf")

  // remove field
  collection.fields.removeById("_clone_EJrH")

  // remove field
  collection.fields.removeById("_clone_M0S7")

  // remove field
  collection.fields.removeById("_clone_hyjQ")

  // remove field
  collection.fields.removeById("_clone_8O9S")

  // remove field
  collection.fields.removeById("_clone_0cwd")

  // remove field
  collection.fields.removeById("_clone_sebP")

  // remove field
  collection.fields.removeById("_clone_TCsb")

  // remove field
  collection.fields.removeById("_clone_FxbI")

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_6YQp",
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
    "help": "",
    "hidden": false,
    "id": "_clone_1V2h",
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
    "help": "",
    "hidden": false,
    "id": "_clone_TL5p",
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
    "id": "_clone_rmvd",
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
    "help": "",
    "hidden": false,
    "id": "_clone_Xbef",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "_clone_xUGr",
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
    "help": "",
    "hidden": false,
    "id": "_clone_Bv5k",
    "maxSize": 0,
    "name": "sources",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(8, new Field({
    "help": "",
    "hidden": false,
    "id": "_clone_Ef9c",
    "maxSize": 0,
    "name": "resources",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "exceptDomains": null,
    "help": "",
    "hidden": false,
    "id": "_clone_0MUw",
    "name": "thumbnail",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // add field
  collection.fields.addAt(10, new Field({
    "help": "",
    "hidden": false,
    "id": "_clone_j8of",
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
  collection.fields.addAt(11, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_WIiN",
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
  collection.fields.addAt(12, new Field({
    "cascadeDelete": true,
    "collectionId": "_pb_users_auth_",
    "help": "",
    "hidden": false,
    "id": "_clone_HOMd",
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
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.attachments,\n    notes.resources,\n    notes.thumbnail,\n    notes.score,\n    notes.status,\n    notes.user as user\nFROM notes"
  }, collection)

  // add field
  collection.fields.addAt(1, new Field({
    "autogeneratePattern": "",
    "help": "",
    "hidden": false,
    "id": "_clone_RFym",
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
    "help": "",
    "hidden": false,
    "id": "_clone_1tVc",
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
    "help": "",
    "hidden": false,
    "id": "_clone_KNMf",
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
    "id": "_clone_EJrH",
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
    "help": "",
    "hidden": false,
    "id": "_clone_M0S7",
    "maxSize": 0,
    "name": "description",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  // add field
  collection.fields.addAt(6, new Field({
    "help": "",
    "hidden": false,
    "id": "_clone_hyjQ",
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
    "help": "",
    "hidden": false,
    "id": "_clone_8O9S",
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
    "help": "",
    "hidden": false,
    "id": "_clone_0cwd",
    "name": "thumbnail",
    "onlyDomains": null,
    "presentable": false,
    "required": false,
    "system": false,
    "type": "url"
  }))

  // add field
  collection.fields.addAt(9, new Field({
    "help": "",
    "hidden": false,
    "id": "_clone_sebP",
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
    "help": "",
    "hidden": false,
    "id": "_clone_TCsb",
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
    "help": "",
    "hidden": false,
    "id": "_clone_FxbI",
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": true,
    "system": false,
    "type": "relation"
  }))

  // remove field
  collection.fields.removeById("_clone_6YQp")

  // remove field
  collection.fields.removeById("_clone_1V2h")

  // remove field
  collection.fields.removeById("_clone_TL5p")

  // remove field
  collection.fields.removeById("_clone_rmvd")

  // remove field
  collection.fields.removeById("_clone_Xbef")

  // remove field
  collection.fields.removeById("_clone_xUGr")

  // remove field
  collection.fields.removeById("_clone_Bv5k")

  // remove field
  collection.fields.removeById("_clone_Ef9c")

  // remove field
  collection.fields.removeById("_clone_0MUw")

  // remove field
  collection.fields.removeById("_clone_j8of")

  // remove field
  collection.fields.removeById("_clone_WIiN")

  // remove field
  collection.fields.removeById("_clone_HOMd")

  return app.save(collection)
})
