// Declaring dependencies
const cheerio = require("cheerio");
const path = require("path");
const express = require("express");

// Setting up the server with Express
let app = express();
let port = 3000;

// Server listening on port 3000 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Set up static files
app.use(express.static(path.join(__dirname, "/assets")));

// Set up HTML routes
app.get("/", function(req, res) {
  res.sendfile(path.join(__dirname, "index.html"));
});