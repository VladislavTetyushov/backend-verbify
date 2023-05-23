// server.js
const express = require('express');
global.app = express();
const path = require('path');
const PORT = 3000;

const PATHS = new function() {
  this.dist = path.resolve(process.env.distPath);
}

require('./backend.js');

app.use(express.static(PATHS.dist));

app.use((req, res) => {
  let url = req.originalUrl;
  if (path.extname(url) === null)
  {
    res.sendFile(path.join(PATHS.dist, 'index.html'));
  } else {
    res.status(404);
    res.send('Cannot get' + url);
  }
  
});



const server = app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});




// Обработка события завершения работы сервера
// process.on('SIGINT', () => {
//   server.close(() => {
//     console.log('Сервер выключен');
//     process.exit(0);
//   });
// });