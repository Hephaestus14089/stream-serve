const path = require('node:path');
const fs = require('node:fs');
const { error } = require('./utilities.js');

const isPositiveNumber = (num) =>
  (isNaN(num) || num <= 0)
  ? false
  : true
;

const validateChunkSize = (chunk_size) => isPositiveNumber(chunk_size);

const validatePort = (port) =>
  (isPositiveNumber(port) && (port >= 0 && port <= 65535))
  ? true
  : false
;

const validateFile = (filePathStr) => {
  const filePath = (['/', '~'].includes(filePathStr.charAt(0)))
    ? path.join(filePathStr)
    : path.join(__dirname, filePathStr)
  ;
  const exactFilePath = filePath.replace('~/', '/home/bhargav/');
  
  if (!fs.existsSync(exactFilePath))  // does file exist
    error("unable to access specified file");
  if (fs.statSync(exactFilePath).isDirectory())  // is file a directory
    error("cannot stream a directory");
};

const validateSettings = (settings, isChanged) => {
  if (!isChanged.file_path)
    error("file path is required");

  if (isChanged.chunk_size && !validateChunkSize(settings.chunk_size))
    error("invalid chunk size");
  if (isChanged.port && !validatePort(settings.port))
    error("invalid port");
  
  validateFile(settings.file_path);
};

module.exports = { validateSettings };
