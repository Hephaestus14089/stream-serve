const express = require('express');
const fs = require('node:fs');

const PORT = process.env.PORT;
const FILE_PATH = process.env.FILE_PATH;
const FILE_TYPE = FILE_PATH.substring(FILE_PATH.lastIndexOf('.') + 1);
const FILE_SIZE = fs.statSync(FILE_PATH).size;
const CHUNK_SIZE = process.env.PREFFERED_CHUNK_SIZE;

const app = express();

app.get('/stream', (req, res) => {
  const range = req.headers.range;

  if (!range)
    res.status(400).send('range header required');

  const start = Number(range.replace(/\D/g, ''));
  const end = Math.min(start + CHUNK_SIZE, FILE_SIZE - 1);
  const contentLength = end - start + 1;

  const headers = {
    'Content-Range': `bytes ${start}-${end}/${FILE_SIZE}`,
    'Accept-Ranges': 'bytes',
    'Content-Length': `${contentLength}`,
    'Content-Type': `video/${FILE_TYPE}`
  };

  res.writeHead(206, headers);

  const videoStream = fs.createReadStream(FILE_PATH, {start, end});

  videoStream.pipe(res);
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
