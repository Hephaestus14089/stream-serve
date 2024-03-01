/**
  * Default chunk size: 200kb
  * There is no default file_path (set to null)
  * Providing a file path is needed, while executing the command
  */

const settings = {
  chunk_size: 204800, 
  port: 80,
  file_path: null
};

module.exports = { settings };
