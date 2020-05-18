module.exports = (mongoose) => {
  var schema = mongoose.Schema({
    title: String,
    description: String,
    updatedS: Number,
    updatedM: Number,
    updatedH: Number,
    dateAndTime: String,
  });

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Tracker = mongoose.model("tracker", schema);
  return Tracker;
};
