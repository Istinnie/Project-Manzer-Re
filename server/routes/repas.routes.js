module.exports = (app) => {
  const repas = require("../controllers/repas.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", repas.create);

  // Retrieve all Tutorials
  router.get("/", repas.findAll);

  // Retrieve all published Tutorials
  // router.get("/published", repas.findAllPublished);

  // Retrieve a single Tutorial with id
  router.get("/:id", repas.findOne);

  // Update a Tutorial with id
  router.put("/:id", repas.update);

  // Delete a Tutorial with id
  router.delete("/:id", repas.delete);

  // Delete all Tutorials
  router.delete("/", repas.deleteAll);

  app.use("/api/repas", router);
};
