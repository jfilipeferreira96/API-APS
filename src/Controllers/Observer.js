const Logger = require("../utils/logger");
const DB = require("../config/database");
const moment = require("moment");

class Subject {
  constructor() {
    this.activityID = "";
    this.inveniraStdID = "";
    this.observers = [];
  }

  addActivity(activityID, inveniraStdID) {
    this.activityID = activityID;
    this.inveniraStdID = inveniraStdID;
  }

  //metodo que adiciona elementos ao observers array
  addObserver(observer) {
    this.observers.push(observer);
  }

  //metodo que remove elementos do observers array
  removeObserver(observer) {
    let index = this.observers.indexOf(observer);
    this.observers.splice(index, 1);
  }

  //da loop a todos os observers e notifica-os quando existiu uma alteraçao
  notifyAllObservers() {
    this.observers.forEach((observer) => {
      observer.notify(this);
    });
  }
}

class ConsoleObserver {
  constructor(name) {
    this.name = name;
  }
  notify(model) {
    console.log(`${this.name} has been notified!`);
    Logger.info(`The student with the ID: ${model.inveniraStdID} has acessed the Activity: ${model.activityID}`);
  }
}

class InsertStudentObserver {
  constructor(name) {
    this.name = name;
  }

  async notify(model) {
    console.log(`${this.name} has been notified!`);

    //insere uma row na tabela xxx com o numero de aluno, atividade e a data de entrada now()
    try {
      const query = `INSERT INTO student_analytics (stdID, activityID, inTimestamp) 
                    VALUES (${model.inveniraStdID}, ${model.activityID}, '${moment().format("YYYY-MM-DD HH:mm:ss")}')`;
      const result = await DB.Query(query);

      if (result) {
        Logger.info(`Inserted field on the database`);
      }
    } catch (err) {
      Logger.error(err);
    }
  }
}

module.exports = {
  Subject,
  ConsoleObserver,
  InsertStudentObserver,
};
