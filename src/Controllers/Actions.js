const Logger = require("../utils/logger");
const DB = require("../config/database");

class ActionsController {
  async ActivityPageParams(req, res) {
    const { activityID, inveniraStdID } = req.params;
    let response = { status: 'Failed' };

    if (!activityID) {
      return res.status(400).json({ message: "Invalid activity ID." });
    }
    if (!inveniraStdID) {
      return res.status(400).json({ message: "Invalid student ID." });
    }

    const params = await DB.Query(`SELECT * FROM page_params WHERE activityID = ${activityID}`);
    
    if (params.length > 0)
    {
      response = { status: 'Success', params: params };
    }
    
    return res.json(response);
  }

  async SaveAnalytics(req, res) {
    const { activityID, inveniraStdID } = req.params;
    const { analytics } = req.body;
    let response = { status: 'Failed' };


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

module.exports = new ActionsController();
