// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static directory
app.use(express.static("public"));

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes
// =============================================================
require("./routes/api-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({force:true}).then(function() {
  db.Customers.create({
    customer_name: 'Michael Rosario',
  });
  db.Burgers.create({
    burger_name: 'The Regular Burger and Cheese',
    CustomerId: 1,
  });
  db.Burgers.create({
    burger_name: 'Mushroom Overload Burger',
    CustomerId: 1,
  });
  app.listen(PORT, function() {
    console.log("Server listening on: http://localhost:" + PORT);
  });
});
