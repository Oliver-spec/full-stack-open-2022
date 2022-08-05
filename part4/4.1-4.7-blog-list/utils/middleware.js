const logger = require("./logger");

const requestLogger = (req, res, next) => {
  logger.info("Method:", res.method);
  logger.info("Path:", res.path);
  logger.info("Body:", res.body);
  logger.info("---");
  next();
};

const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "unknown endpoint" });
};

const errorHandler = (err, req, res, next) => {
  logger.error(err.message);
  res.status(400).json({ error: "server error" });

  next(err);
};

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
