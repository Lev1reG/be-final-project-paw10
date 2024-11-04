const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome to PAW 10 Backend Service");
});

app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});
