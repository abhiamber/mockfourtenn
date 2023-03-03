const express = require("express");
const app = express();
let conncet = require("./config/db");
require("dotenv").config();
let PORT = process.env.PORT || 8080;

app.use(express.json());
let cors = require("cors");
app.use(cors());

app.get("/", async (req, res) => {
  res.send("hurray14.....");
});



app.listen(PORT, async () => {
  await conncet();
  console.log("server is working");
});
