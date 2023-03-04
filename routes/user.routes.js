let express = require("express");
require("dotenv").config();
let app = express.Router();
let UserModel = require("../model/user.model");
const bcrypt = require("bcrypt");
let KEY = process.env.KEY;
let jwt = require("jsonwebtoken");

// ********signup*********

app.post("/singup", async (req, res) => {
  let { email, password } = req.body;

  let user = await UserModel.findOne({ email });

  if (user) {
    return res.send({ messg: "user exists", OK: "NO" });
  }

  try {
    bcrypt.hash(password, 8, async function (err, hash) {
      if (err) {
        return res.send({ messg: err.message, OK: "NO" });
      } else {
        console.log(hash);
        let newUser = new UserModel({ email, password: hash });
        await newUser.save();
        res.send({ messg: "registed", OK: "OK" });
      }
    });
  } catch (e) {
    console.log(e.message);
    res.send({ messg: e.message, OK: "NO" });
  }
});

// ***********user login**************

app.post("/login", async (req, res) => {
  let { email, password } = req.body;
  let user = await UserModel.findOne({ email });

  if (!user) {
    return res.send({ messg: "Invalid Crediatinals", OK: "NO" });
  }

  try {
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.send({ messg: err.message, OK: "NO" });
      } else if (result) {
        let token = jwt.sign({ id: user._id, email }, KEY);

        res.send({ messg: token, OK: "OK" });
      } else {
        return res.send({ messg: "Invalid Crediatinals", OK: "NO" });
      }
      // result == true
    });
  } catch (e) {
    console.log(e.message);
    res.send({ messg: e.message, OK: "NO" });
  }
});

module.exports = app;
