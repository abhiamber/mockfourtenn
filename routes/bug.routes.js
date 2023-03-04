let express = require("express");
let BugModel = require("../model/bug.model");
const app = express.Router();

app.post("/", async (req, res) => {
  let { zone, content } = req.body;

  try {
    let bug = new BugModel({ zone, content });
    await bug.save();
    res.send({ messg: "new bug addded" });
  } catch (e) {
    res.send({ messg: e.message });
  }
});

// ******************git add bug******
app.get("/", async (req, res) => {
  try {
    let bug = await BugModel.find();
    res.send({ messg: bug });
  } catch (e) {
    res.send({ messg: e.message });
  }
});

// ******************git add bug******
app.delete("/:id", async (req, res) => {
  let { id } = req.params;
  console.log(id);
  try {
    await BugModel.findByIdAndDelete(id);
    res.send({ messg: "deleetd" });
  } catch (e) {
    res.send({ messg: e.message });
  }
});

module.exports = app;
