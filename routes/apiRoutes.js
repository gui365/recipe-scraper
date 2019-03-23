const axios = require("axios"),
      cheerio = require("cheerio");

const apiRoutes = {
  getRecipe: function(req, res) {
    const link = req.body.recipeLink;
    
    // Just making sure the server can send info back to client
    // console.log(link)
    // res.json({ link });
  
    // Will use cheerio to scrape NYT Cooking and generate the PDF of the recipe
    axios.get(link).then(function(response) {
      const $ = cheerio.load(response.data);
      
      let pictureUrl = $(".media-container").find("img").attr("src");
      let title = $(".recipe-title").text().trim();
      let author = $(".byline-name").text().trim();
      let recipeYield = $(".recipe-time-yield").children().first().find(".recipe-yield-value").text().trim();
      let recipeTime = $(".recipe-time-yield").children().last().find(".recipe-yield-value").text().trim();
      let intro = $(".topnote").children().first().text().trim();
      
      let ingredients = [];
      $(".recipe-ingredients").children().each(function(i, ingredient) {
        let ing = "";
        ing += $(ingredient).find(".quantity").text().replace(/[\s\n\t\r]/g,"") + " ";
        ing += $(ingredient).find(".ingredient-name").text().replace(/\s\s+/g, "");
        ingredients.push(ing);
      })
      
      let preparation = [];
      $(".recipe-steps").children().each(function(i, step) {
        preparation.push($(step).text());
      })
      
      res.json({ 
        pictureUrl,
        title,
        author,
        recipeYield,
        recipeTime,
        intro,
        ingredients,
        preparation
      });

    });
  }
};

module.exports = apiRoutes;