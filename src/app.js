const express = require("express");
const routes = require("./routes");
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public")); // Serve static files (e.g. CSS files)

app.use(routes);

module.exports = app;
