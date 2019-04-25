
// Import the model to use its database functions.
var db = require("../models");

module.exports = function(app) {

  // GET route for getting all of the todos
  app.get("/", function(req, res) {
    db.Burgers.findAll({}).then(function(burgers) {
      // We have access to the todos as an argument inside of the callback function
      res.render("index",{burgers});
    });
  });

  app.post("/api/burgers", function(req, res) {
    db.Burgers.create({
      burger_name: req.body.burger_name,
    }).then(function(results) {
      res.json(results);
    });
  });

  app.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;
  
    db.Burgers.update({
      devoured: req.body.devoured,
    }, {
      where: {
        id: req.params.id
      }
    }).then(function(results) {
      res.json(results);
    });

  });

}