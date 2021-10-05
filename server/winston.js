const { createLogger, format, transports } = require('winston');
const newrelicFormatter = require('@newrelic/winston-enricher');
const { combine, timestamp, label, printf } = format;
const appRoot = require('app-root-path');

const logger = createLogger({
	level: 'debug',
	format: format.combine(newrelicFormatter()),
	defaultMeta: { service: 'backend-api' },
	transports: [
		new transports.Console({
			format: format.simple(),
		}),
		new transports.File({
			filename: `logs/api.log`,
			maxFiles: 5,
			handleExceptions: false,
			maxsize: 5242880,
			colorize: false,
			json: false,
		}),
	],
});

logger.stream = {
	write: function (message, encoding) {
		logger.info(message);
	},
};

module.exports = logger;
