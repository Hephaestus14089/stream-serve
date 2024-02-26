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

const displayHelp = () => {
  console.log(`
    Usage: \n\tstream-serve [options] [file-path]
  
    Description: \n\tServes stream of video files.

    Options: \n
    \t--help, -h\tshow this help message and exit
    \t--port, -p\tspecify the port to run the stream server on (default: 80)
    \t--chunk-size. -c\tspecify the size of each chunk in the stream (default: 200kb)
  `);
};

const displayErrMsg = (msg) => {
  console.log(`err: ${msg}`);
};

const badCommand = () => {
  displayErrMsg("Unable to understand. Please recheck command syntax.");
};

const argsParse = (args) => {
  // console.log(args);  // debug output
  for (let i = 2; i < args.length; i++) {
    if (args[i].charAt(0) === '-') {  // is an option
      if (['--help', '-h'].includes(args[i])) {
        displayHelp();
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
        displayHelp();
        process.exit(1);
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

  // console.log(process.argv);  // debug output
  // console.log(settings);  // debug output

  argsParse(process.argv);

  console.log(settings);  // debug output
} // end of main

main();
