/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_407636231")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER()) AS id,\n  rating,\n  score_bucket,\n  COUNT(*) AS count,\n  ROUND(AVG(score), 2) AS avg_score,\n  ROUND(MIN(score), 2) AS min_score,\n  ROUND(MAX(score), 2) AS max_score,\n  ROUND(MAX(score) - MIN(score), 2) AS score_range,\n  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage_of_total,\n  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (PARTITION BY rating), 1) AS percentage_of_rating,\n  ROUND(\n    SQRT(AVG(score * score) - AVG(score) * AVG(score)), 2\n  ) AS std_deviation,\n  ROUND(\n    CASE\n      WHEN AVG(score) = 0 THEN NULL\n      ELSE SQRT(AVG(score * score) - AVG(score) * AVG(score)) / AVG(score)\n    END, 2\n  ) AS coef_variation\nFROM (\n  SELECT \n    rating,\n    score,\n    CASE\n      WHEN score < 5 THEN '0–4'\n      WHEN score < 15 THEN '5–14'\n      WHEN score < 25 THEN '15–24'\n      WHEN score < 50 THEN '25-49'\n      ELSE '50–100'\n    END AS score_bucket\n  FROM notes\n  WHERE rating IS NOT NULL AND score IS NOT NULL\n) AS bucketed_notes\nGROUP BY rating, score_bucket\nORDER BY rating DESC, score_bucket ASC;"
  }, collection)

  // add field
  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "json2852097374",
    "maxSize": 1,
    "name": "percentage_of_rating",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "json"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_407636231")

  // update collection data
  unmarshal({
    "viewQuery": "SELECT\n  (ROW_NUMBER() OVER()) AS id,\n  rating,\n  score_bucket,\n  COUNT(*) AS count,\n  ROUND(AVG(score), 2) AS avg_score,\n  ROUND(MIN(score), 2) AS min_score,\n  ROUND(MAX(score), 2) AS max_score,\n  ROUND(MAX(score) - MIN(score), 2) AS score_range,\n  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER (), 1) AS percentage_of_total,\n  ROUND(\n    SQRT(AVG(score * score) - AVG(score) * AVG(score)), 2\n  ) AS std_deviation,\n  ROUND(\n    CASE\n      WHEN AVG(score) = 0 THEN NULL\n      ELSE SQRT(AVG(score * score) - AVG(score) * AVG(score)) / AVG(score)\n    END, 2\n  ) AS coef_variation\nFROM (\n  SELECT \n    rating,\n    score,\n    CASE\n      WHEN score < 5 THEN '0–4'\n      WHEN score < 15 THEN '5–14'\n      WHEN score < 25 THEN '15–24'\n      WHEN score < 50 THEN '25-49'\n      ELSE '50–100'\n    END AS score_bucket\n  FROM notes\n  WHERE rating IS NOT NULL AND score IS NOT NULL\n) AS bucketed_notes\nGROUP BY rating, score_bucket\nORDER BY rating DESC, score_bucket ASC;"
  }, collection)

  // remove field
  collection.fields.removeById("json2852097374")

  return app.save(collection)
})
