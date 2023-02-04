const Logger = require("../utils/logger");

//Neste documento encontra-se o Design Pattern: Proxy

class Analytics {
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
    this.OriginalAnalytics = OriginalAnalytics;
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
    }

    //se a analitica da Atividade não estiver em cache, então procuramos na DB
    Logger.info("Fetching the DB for the Ativity Analytics");

    const fetchDatabase = await this.OriginalAnalytics.GetActivityAnalytics(req, res);
    if (fetchDatabase.status !== "Success") {
      return res.status(400);
    }

    this.LogNumOfDatabaseFetch();
    this.previousAnalytics[activityID] = fetchDatabase.result;
    return res.status(200).json(fetchDatabase.result);
  }

  LogNumOfDatabaseFetch() {
    this.cacheSuccessFetchs++;
    Logger.proxy(`Number of successful fetchs to the database: ${this.cacheSuccessFetchs}`);
  }

  //2. Lista de analytics da atividade
  // analytics_list_url: URL para um Web service que devolve a lista de analytics que o Activity Provider recolherá
  async GetAnalytics(req, res) {
    const sendTestAnalytics = [
      {
        name: "inveniraStdID",
        type: "integer",
        analytics: [
          { name: "numOfResets", type: "integer" },
          { name: "numOfSubmits", type: "integer" },
          { name: "wasInformationClicked", type: "boolean" },
          { name: "answer", type: "array" },
        ],
      },
    ];

    return res.status(200).json(sendTestAnalytics);
  }
}

const OriginalAnalytics = new Analytics();

module.exports = new AnalyticsProxy(OriginalAnalytics);
