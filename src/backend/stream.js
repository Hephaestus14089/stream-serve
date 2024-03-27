const express = require('express');
const fs = require('node:fs');
const path = require('node:path');

const startStream = (settings) => {
  const { chunk_size, port, file_path } = settings;
  const file_type = file_path.substring(file_path.lastIndexOf('.') + 1);
  const file_size = fs.statSync(file_path).size;
  
  const app = express();

  app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,  '../', 'frontend/', 'index.html'));
  });

  app.get('/stream', (req, res) => {
    const range = req.headers.range;

    if (!range)
      res.status(400).send('range header required');

    const start = Number(range.replace(/\D/g, ''));
    const end = Math.min(start + chunk_size, file_size - 1);
    const contentLength = end - start + 1;

    const headers = {
      'Content-Range': `bytes ${start}-${end}/${file_size}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': `${contentLength}`,
      'Content-Type': `video/${file_type}`
    };

    res.writeHead(206, headers);

    const videoStream = fs.createReadStream(file_path, {start, end});

    videoStream.pipe(res);
  });

  app.listen(port, () => {
    console.log(`Server started successfully.`);
  });
};

module.exports = { startStream };
