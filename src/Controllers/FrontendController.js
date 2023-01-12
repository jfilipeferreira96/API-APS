const Logger = require("../utils/logger");
const DB = require("../config/database");

class FEController {
  async ActivityPageParams(req, res) {
    const { activityID, inveniraStdID } = req.params;
    if (!activityID) {
      return res.status(400).json({ message: "Invalid activity ID." });
    }
    if (!inveniraStdID) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const teste = await DB.Query(`SELECT * FROM page_params`);

    //console.log(teste);
    return res.json(teste);
  }

  async SaveAnalytics(req, res) {
    const { activityID, inveniraStdID } = req.params;
    const { analytics } = req.body;
    if (!activityID) {
      return res.status(400).json({ message: "Invalid activity ID." });
    }
    if (!inveniraStdID) {
      return res.status(400).json({ message: "Invalid student ID." });
    }
    console.log(analytics);

    return res.json({ message: "tudo ok" });
  }
}

module.exports = new FEController();
