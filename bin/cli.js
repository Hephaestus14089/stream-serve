const { helpMsg, badCommand } = require('../utilities.js');
const { validateSettings } = require('../validations.js');
const { startStream } = require('../stream.js');

const settings = {
  chunk_size: 204800, // default chunk size: 200kb
  port: 80, // default port
  file_path: null
};

const isChanged = {
  chunk_size: false,
  port: false,
  file_path: false
};

const argsParse = (args) => {
  for (let i = 2; i < args.length; i++) {
    if (args[i].charAt(0) === '-') {  // is an option
      if (['--help', '-h'].includes(args[i])) {
        console.log(helpMsg());
        process.exit(0);
      }
      else if (['--chunk-size', '-c'].includes(args[i])) {
        settings.chunk_size = args[i + 1];
        isChanged.chunk_size = true;
      }
      else if (['--port', '-p'].includes(args[i])) {
        settings.port = args[i + 1];
        isChanged.port = true;
      }
      else {
        badCommand();
      }
    }
    else if (args[i - 1].charAt(0) !== '-') {  // is a file path
      settings.file_path = args[i];
      isChanged.file_path = true;
    }
  }
};

function main() {
  /**
    * Parse arguments
    * check what's changed
    * validate user input
    * call functions
    */

  argsParse(process.argv);

  validateSettings(settings, isChanged);

  startStream(settings);
} // end of main

main();
