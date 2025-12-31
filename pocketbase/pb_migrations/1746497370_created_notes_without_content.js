/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = new Collection({
    "createRule": null,
    "deleteRule": null,
    "fields": [
      {
        "autogeneratePattern": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 0,
        "min": 0,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
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
      },
      {
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
      },
      {
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
      },
      {
        "hidden": false,
        "id": "_clone_aAXf",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "convertURLs": false,
        "hidden": false,
        "id": "_clone_cnSM",
        "maxSize": 0,
        "name": "description",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "editor"
      },
      {
        "exceptDomains": null,
        "hidden": false,
        "id": "_clone_jL0j",
        "name": "thumbnail",
        "onlyDomains": null,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "url"
      }
    ],
    "id": "pbc_851678412",
    "indexes": [],
    "listRule": null,
    "name": "notes_without_content",
    "system": false,
    "type": "view",
    "updateRule": null,
    "viewQuery": "SELECT \n    notes.id,\n    notes.title,\n    notes.tags,\n    notes.notebook,\n    notes.created,\n    notes.description,\n    notes.thumbnail\nFROM notes",
    "viewRule": null
  });

  return app.save(collection);
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_851678412");

  return app.delete(collection);
})
