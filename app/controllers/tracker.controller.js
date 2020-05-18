const db = require("../models");
const Tracker = db.trackers;

// Create and Save a new Tracker
exports.create = (req, res) => {
  // Validate request
  if (!req.body.description) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  if (!req.body.dateAndTime) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a tracker
  const tracker = new Tracker({
    title: req.body.title,
    description: req.body.description,
    updatedS: req.body.updatedS,
    updatedM: req.body.updatedM,
    updatedH: req.body.updatedH,
    dateAndTime: req.body.dateAndTime,
  });

  // Save tracker in the database
  tracker
    .save(tracker)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the tracker.",
      });
    });
};

// Retrieve all trackers from the database.
exports.findAll = (req, res) => {
  const description = req.query.description;
  // parse the string to integer for both page and limit
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
// search condition for the description input field
  var condition = description
    ? { description: { $regex: new RegExp(description), $options: "i" } }
    : {};

  Tracker.find(condition)
    .limit(limit)
    .skip(startIndex)
    .exec()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving trackers.",
      });
    });
};
