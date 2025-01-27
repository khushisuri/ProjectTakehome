const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const Form = require("./models/form");
app.use(cors());
app.use(express.json());

const dbURI =
  "mongodb+srv://khushi1:Kooktae1@cluster0.7gszs.mongodb.net/forms_db";

mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => console.log("connected"))
  .catch((err) => console.log(err));

app.post("/api/forms/save", (req, res) => {
  const obj = {
    form_name: req.body.name,
    form_data: JSON.stringify(req.body.boardList),
  };
  const form = new Form(obj);

  form
    .save()
    .then((result) => {
      res.json({ message: "success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/api/forms/list", (req, res) => {
  Form.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(8000, () => {
  console.log(`Server is running on port 8000.`);
});
