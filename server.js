var Sequelize = require('sequelize')
  , sequelize = new Sequelize('lawyer_scoreboard', 'root', null, {
      dialect: "mysql", // or 'sqlite', 'postgres', 'mariadb'
      // port:    3306, // or 5432 (for postgres)
    })
 
var Lawyers = sequelize.define("Lawyers", {
  name: Sequelize.STRING,
  location: Sequelize.STRING,
  record: Sequelize.STRING,
  hourly_rate: Sequelize.INTEGER
})

sequelize.sync();

var express = require("express");

var app = express();

// var Lawyer = {};

// middleware
app.all("*", function(req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
	res.setHeader("Access-Control-Allow-Headers", "Origins, X-Requested-With, Content-Type, Accept");
	res.type("application/json");
	next();
});

// static read-only endpoints(i.e. "/name")
app.get("/lawyers", function(req, res) {
	Lawyers.all().success(function(lawyers) {
  		// lawyers will be an array of all Lawyer instances
		res.send(lawyers)
	})
});

app.listen(8030);