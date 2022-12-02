class Logger {
    constructor(){
        this.config = {
            dateFormat: new Date().toISOString()
        }
    }

    setConfig(config){
        this.config = config;
    }

    info(message)
    {
        console.log('\x1b[33m%s\x1b[0m',`[${this.config.dateFormat}] [INFO]:`, message)
    }

    error(message)
    {
        console.log('\x1b[31m%s\x1b[0m',`[${this.config.dateFormat}] [ERROR]:`, message)
    }
}

module.exports = new Logger();