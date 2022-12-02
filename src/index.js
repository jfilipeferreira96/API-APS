const app = require("./app");
const DB = require("./config/database");
const Logger = require("./utils/logger");
const port = process.env.PORT || 5000;

//altera a configuração default do singleton Logger e este singlenton fica com esta nova configuração em todo lado!
Logger.setConfig({
  dateFormat: new Date().toLocaleString(),
});

DB.StartDB(); //liga a DB e utiliza singleton

app.listen(port, () => Logger.info(`Server is running on Port ${port}`));
