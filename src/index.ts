// TODO: add start stop system
import * as server from './server';

/* eslint no-process-env: off*/
const httpsPort = 443;
const serverPort = Number(process.env.port ?? httpsPort);

server
  .start(serverPort)
  .then(() => console.log(`Server startet on Port: ${serverPort}`))
  .catch(console.error);
