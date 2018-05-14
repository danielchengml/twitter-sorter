const express = require("express");
const mongoose = require("mongoose");

const client = require("./routes/api/client");

const app = express();

const db = require("./config/keys").mongoURI;

mongoose
  .connect(db)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.get("/", (req, res) =>
  res.json({ message: "Server Connection Successful" })
);
app.use("/client", client);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
