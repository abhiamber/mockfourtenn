let { Schema, model } = require("mongoose");

let userSchema = new Schema(
  {
    email: String,
    password: String,
  },
  { versionKey: false }
);

let UserMOdel = model("user", userSchema);

module.exports = UserMOdel;
