const mysql = require("mysql2");
const logger = require("../utils/logger");

class DB {
  StartDB() {
    this.pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DBNAME,
    });

    this.pool.getConnection((err, conn) => {
      if (err) Logger.error(err);
      logger.info("MySQL connection successful");
    });
  }

  async Query(query, state = undefined) {
    return new Promise((resolve, reject) => {
      var foreignkey = state == undefined ? "" : "SET FOREIGN_KEY_CHECKS=" + (state === true ? "1" : "0") + ";";
      this.pool.query(foreignkey + query, (error, results) => {
        if (error) {
          reject(error.sqlMessage + " : " + error.sql);
        }

        return resolve(results);
      });
    });
  }

  Escape(data) {
    return mysql.escape(data);
  }

  EscapeObjects(obj) {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (typeof obj[key] == "object") {
          this.EscapeObjects(obj[key]);
        } else {
          if (obj[key]) {
            obj[key] = typeof obj[key] === "boolean" ? obj[key] : mysql.escape(obj[key]);
          }
        }
      }
    }
    return obj;
  }
}

module.exports = new DB();
