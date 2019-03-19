// Declaring dependencies
const cheerio = require("cheerio");
const path = require("path");
const express = require("express");

// Setting up the server with Express
let app = express();
let port = 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})