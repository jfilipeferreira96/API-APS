const express = require("express");
const routes = require("./routes");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
/* app.use(express.json());
app.use(express.urlencoded({ extended: true })); */
app.use(express.static("public"));
app.use(express.static(__dirname + "/public"));
app.use(express.static("files"));

// View engine setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "Views"));

app.use(routes);

module.exports = app;
