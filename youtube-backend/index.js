const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to Youtube Dashboard");
});

app.listen(3000, () => {
  console.log("App running at 3000");
});
