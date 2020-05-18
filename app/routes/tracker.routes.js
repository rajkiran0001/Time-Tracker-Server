module.exports = (app) => {
  const trackers = require("../controllers/tracker.controller.js");

  var router = require("express").Router();

  // Create a new Tracker
  router.post("/", trackers.create);

  // Retrieve all Trackers
  router.get("/", trackers.findAll);

  app.use("/api/trackers", router);
};
