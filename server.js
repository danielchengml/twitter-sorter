const express = require("express");
const mongoose = require("mongoose");

const client = require("./routes/api/client");
const tweets = require("./routes/api/tweets");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) =>
  res.json({ message: "Server Connection Successful" })
);
app.use("/api/client", client);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
