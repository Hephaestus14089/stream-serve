/**
 * Options :-
 * --chunk-size, -c
 * --port, -p
 * --help, -h
 */

/**
 * Flow of the app algorithm :-
 * get user input (command)
 * verify user input
 * do/run stuff accordingly
 */

const settings = {
  chunk_size: 204800, // default chunk size: 200kb
  port: 80, // default port
  file_path: null
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

const argsParse = (args) => {
  console.log(args);  // debug output

  isOptionSet = {
    'chunk_size': false,
    'port': false,
    'file_path': false
  };

  for (let i = 2; i < args.length; i++) {
    if (args[i].charAt(0) === '-') {  // is an option
      if (['--help', '-h'].includes(args[i])) {
        displayHelp();
        process.exit(0);
      }
      else if (['--chunk-size', '-c'].includes(args[i])) {
        // if (isOptionSet['chunk-size'])
        //   badCommand()
        //
        // isOptionSet['chunk-size'] = true;
        //
        // const chunkSize = args[i + 1]
        // validate chunk size value
        // set chunk size
      }
      else if (['--port', '-p'].includes(args[i])) {
        // check if already set 
        // 
        // validate value
        // set port
      }
      else {
        // bad command error
        // display help command
      }
    }
    else {  // is a file path
      // if (isOptionSet('file-path'))
      //  bad file path error
      //
      // isOptionSet['file-path'] = true;
      // validate file path 
      // set file path 
    }
  }
};

function main() {
  console.log(process.argv);  // debug output
  console.log(settings);  // debug output

  argsParse(process.argv);
} // end of main

main();
