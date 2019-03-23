const htmlRoutes = {
  home: function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  }
}

module.exports = htmlRoutes;