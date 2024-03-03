const fs = require('node:fs');
const { error } = require('./utilities.js');

const isPositiveNumber = (num) =>
  (isNaN(num) || num <= 0)
  ? false
  : true
;

const validateChunkSize = (chunk_size) => {
  if (!isPositiveNumber(chunk_size));
    error("invalid chunk size");
};

const validatePort = (port) => {
  if (!(isPositiveNumber(port) && (port >= 0 && port <= 65535)))
    error("invalid port");
};

const validateFile = (filePath) => { 
  if (!fs.existsSync(filePath))  // does file exist
    error("unable to access specified file");
  if (fs.statSync(filePath).isDirectory())  // is file a directory
    error("cannot stream a directory");
};

const validateSettings = (settings, isChanged) => {
  if (!isChanged.file_path)
    error("file path is required");

  if (isChanged.chunk_size) {
    validateChunkSize(settings.chunk_size);
    settings.chunk_size = Number(settings.chunk_size);
  }
  if (isChanged.port) {
    validatePort(settings.port);
    settings.port = Number(settings.port);
  }

  validateFile(settings.file_path);
};

module.exports = { validateSettings };
