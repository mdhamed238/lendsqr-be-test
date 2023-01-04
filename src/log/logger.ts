import pino from "pino";

// use oop to create a logger
class Logger {
    private logger: pino.Logger;

    constructor(options?: pino.LoggerOptions) {
        this.logger = pino(options);
    }

    public info(message: string): void {
        this.logger.info(message);
    }

    public error(message: string, error: Error): void {
        this.logger.error(message, error);
    }
}

const logger = new Logger();

export default logger;