/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  let settings = app.settings();
  settings.batch.enabled = true;
  settings.batch.maxRequests = 50; // comfortably covers your 30-50/month batches
  app.save(settings);
}, (app) => {
   let settings = app.settings();
  settings.batch.enabled = false;
  app.save(settings);
})
