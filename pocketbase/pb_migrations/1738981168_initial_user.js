/// <reference path="../pb_data/types.d.ts" />
migrate(
  (app) => {
    let superusers = app.findCollectionByNameOrId("_superusers");

    let record = new Record(superusers);

    // note: the values can be eventually loaded via $os.getenv(key)
    // or from a special local config file
    record.set("email", "admin@pocketbase.com");
    record.set("password", "amiodarone");

    app.save(record);
  },
  (app) => {
    // optional revert operation
    try {
      let record = app.findAuthRecordByEmail(
        "_superusers",
        "admin@pocketbase.com"
      );
      app.delete(record);
    } catch {
      // silent errors (probably already deleted)
    }
  }
);
