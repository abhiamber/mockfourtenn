let { Schema, model } = require("mongoose");

let bugSchema = new Schema({
  content: String,
  zone: String,
});

let BugModel = model("bug", bugSchema);
module.exports = BugModel;
