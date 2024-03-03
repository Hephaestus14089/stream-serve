#!/usr/bin/env node 

const { helpMsg, badCommand } = require('../src/utilities.js');
const { validateSettings } = require('../src/validations.js');
const { startStream } = require('../src/stream.js');
const { settings } = require('../src/defaults.js');

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
  argsParse(process.argv);

  if (isChanged.chunk_size)
    console.log(`Chunk size: ${settings.chunk_size}`);
  else
    console.log(`Chunk size not provided. Using default value: ${settings.chunk_size}`);
  if (isChanged.port)
    console.log(`Port: ${settings.port}`);
  else
    console.log(`Port not provided. Using default value: ${settings.port}`);

  console.log(`File path: ${settings.file_path}`);

  validateSettings(settings, isChanged);

  console.log("\nStarting server...");
  startStream(settings);
} // end of main

main();
