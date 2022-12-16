class Logger {
  constructor() {
    this.config = {
      dateFormat: new Date().toLocaleString(),
    };
  }

  info(message) {
    console.log("\x1b[33m%s\x1b[0m", `[${this.config.dateFormat}] [INFO]:`, message);
  }

  error(message) {
    console.log("\x1b[31m%s\x1b[0m", `[${this.config.dateFormat}] [ERROR]:`, message);
  }

  proxy(message) {
    console.log("\x1b[35m%s\x1b[0m", `[${this.config.dateFormat}] [Proxy]:`, message);
  }
}

module.exports = new Logger();
