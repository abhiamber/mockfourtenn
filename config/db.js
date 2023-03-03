let mongoose = require("mongoose");
require("dotenv").config();
mongoose.set("strictQuery", true);

let conncet = () => {
  return mongoose.connect(process.env.DB_URL);
};

module.exports = conncet;
