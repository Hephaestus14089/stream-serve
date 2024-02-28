const helpMsg = () => `
  Usage: \n\tstream-serve [options] [file-path]

  Description: \n\tServes stream of video files.

  Options: \n
  \t--help, -h\tshow this help message and exit
  \t--port, -p\tspecify the port to run the stream server on (default: 80)
  \t--chunk-size. -c\tspecify the size of each chunk in the stream (default: 200kb)
`;

const errMsg = (msg) => `err: ${msg}`;

const error = (msg) => {
  console.error(errMsg(msg));
  process.exit(1);
} 

const badCommand = () => {
  console.error(errMsg("Unable to understand. Please recheck command syntax."));
  console.log(helpMsg());
  process.exit(1);
};

export { helpMsg, error, badCommand };
