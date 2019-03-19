// Declaring dependencies
const cheerio = require("cheerio"),
      path = require("path"),
      express = require("express"),
      axios = require("axios"),
      bodyParser = require("body-parser");

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
app.use(express.static(path.join(__dirname, "/assets")));

// Set up HTML routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.post("/recipe", function(req, res) {
  const link = req.body.recipeLink;
  
  // Just making sure the server can send info back to client
  // console.log(link)
  res.json({ link });

  // Will use cheerio to scrape NYT Cooking and generate the PDF of the recipe
  axios.get(link).then(function(response) {
    const $ = cheerio.load(response.data);
    
    let title = $(".recipe-title").text().trim();
    let author = $(".byline-name").text().trim();
    let recipeYield = $(".recipe-time-yield").children().first().find(".recipe-yield-value").text().trim();
    let recipeTime = $(".recipe-time-yield").children().last().find(".recipe-yield-value").text().trim();
    let intro = $(".topnote").children().first().text().trim();
    
    let ingredients = [];
    $(".recipe-ingredients").each(function(i, ingredient) {
      // console.log($(ingredient).children().first().text().trim());
      let ing;
      $(ingredient).each(function(j, pieceOfInfo) {
        ing += $(pieceOfInfo).text().replace(/[\n\t\r]/g,"") + " ";
      })
      ingredients.push(ing);
    })
    console.log(ingredients.length);
    
  });
});