// Declaring dependencies
const path = require("path"),
      express = require("express"),
      bodyParser = require("body-parser"),
      // Routes
      apiRoutes = require("./routes/apiRoutes"),
      htmlRoutes = require("./routes/htmlRoutes");      

// Setting up the server with Express
let app = express();
let port = 3000;

// Setting up body parser for POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Server listening on port 3000 
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// Set up static files
app.use(express.static(path.join(__dirname, "/public")));

// Set up HTML routes
app.get("/", htmlRoutes.home);

// Set up API routes
app.post("/recipe", apiRoutes.getRecipe);