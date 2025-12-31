/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3395098727')

    // update field
    collection.fields.addAt(
      18,
      new Field({
        hidden: false,
        id: 'file1204091606',
        maxSelect: 200,
        maxSize: 1000000000,
        mimeTypes: [],
        name: 'attachments',
        presentable: false,
        protected: false,
        required: false,
        system: false,
        thumbs: ['500x0'],
        type: 'file'
      })
    )

    return app.save(collection)
  },
  (app) => {
    const collection = app.findCollectionByNameOrId('pbc_3395098727')

    // update field
    collection.fields.addAt(
      18,
      new Field({
        hidden: false,
        id: 'file1204091606',
        maxSelect: 99,
        maxSize: 1000000000,
        mimeTypes: [],
        name: 'attachments',
        presentable: false,
        protected: false,
        required: false,
        system: false,
        thumbs: ['500x0'],
        type: 'file'
      })
    )

    return app.save(collection)
  }
)
