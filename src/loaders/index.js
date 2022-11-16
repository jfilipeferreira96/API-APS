const DB = require("./database");

class Loaders {
  start() {
    DB.StartDB();
  }
}

module.exports = new Loaders();
