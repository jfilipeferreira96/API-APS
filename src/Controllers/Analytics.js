const Logger = require("../utils/logger");

class AnalyticsController {
  //4. Analytics de atividade
  //devolve analytics_url
  async GetActivityAnalytics(req, res) {
    const { activityID } = req.body;

    const sendTestAnalytics = [
      {
        activityID: activityID,
        inveniraStdID: 1001,
        analytics: [
          { numOfResets: "numOfResets", value: 2 },
          { name: "numOfSubmits", value: 3 },
          { name: "wasInformationClicked", value: true },
          { name: "answer", type: ["align:left"] },
        ],
      },
      {
        activityID: activityID,
        inveniraStdID: 1002,
        analytics: [
          { numOfResets: "numOfResets", value: 0 },
          { name: "numOfSubmits", value: 1 },
          { name: "wasInformationClicked", value: false },
          { name: "answer", type: ["color:blue"] },
        ],
      },
    ];

    return res.status(200).json(sendTestAnalytics);
  }
}

class AnalyticsProxy {
  constructor() {
    this.OriginalAnalyticsController = OriginalAnalyticsController;

    //Fix to handle the 'this' keyword...
    Object.getOwnPropertyNames(AnalyticsProxy.prototype).forEach((key) => {
      if (key !== "constructor") {
        this[key] = this[key].bind(this);
      }
    });
  }

  request(req, res) {
    if (this.checkAccess()) {
      this.OriginalAnalyticsController.GetActivityAnalytics(req, res);
      this.logAccess();
    }
  }

  checkAccess() {
    Logger.proxy("Checking access prior to firing a real request.");
    return true;
  }

  logAccess() {
    Logger.proxy("Logging the time of request.");
  }
}

const OriginalAnalyticsController = new AnalyticsController();

module.exports = new AnalyticsProxy(OriginalAnalyticsController);
