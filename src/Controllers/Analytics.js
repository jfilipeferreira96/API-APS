const Logger = require("../utils/logger");

//Neste documento encontra-se o Design Pattern: Proxy

class AnalyticsController {
  //4. Analytics de atividade
  //devolve analytics_url
  async GetActivityAnalytics(req, res) {
    const { activityID } = req.body;
    let response = {
      status: "Failed",
      result: [],
    };

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

    response = {
      status: "Success",
      result: sendTestAnalytics,
    };

    return response;
  }
}

class AnalyticsProxy {
  constructor() {
    this.OriginalAnalyticsController = OriginalAnalyticsController;
    this.cacheSuccessFetchs = 0;
    this.previousAnalytics = [];

    //Fix to handle the 'this' keyword...
    Object.getOwnPropertyNames(AnalyticsProxy.prototype).forEach((key) => {
      if (key !== "constructor") {
        this[key] = this[key].bind(this);
      }
    });
  }

  async FetchAnalytics(req, res) {
    const { activityID } = req.body;

    if (this.previousAnalytics.length > 0 && this.previousAnalytics[activityID]) {
      //Caso a analitica da atividade esteja em cache, então não precisamos de fazer uma query na DB
      Logger.info("Cached analytics");

      return res.status(200).json(this.previousAnalytics[activityID]);
    } else {
      //se a analitica da Atividade não estiver em cache, então procuramos na DB
      Logger.info("Fetching the DB for the Ativity Analytics");

      const fetchDatabase = await this.OriginalAnalyticsController.GetActivityAnalytics(req, res);
      if (fetchDatabase.status == "Success") {
        this.LogNumOfDatabaseFetch();
        this.previousAnalytics[activityID] = fetchDatabase.result;
        return res.status(200).json(fetchDatabase.result);
      } else {
        return res.status(400);
      }
    }
  }

  LogNumOfDatabaseFetch() {
    this.cacheSuccessFetchs++;
    Logger.proxy(`Number of successful fetchs to the database: ${this.cacheSuccessFetchs}`);
  }
}

const OriginalAnalyticsController = new AnalyticsController();

module.exports = new AnalyticsProxy(OriginalAnalyticsController);
