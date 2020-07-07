import express from 'express';
import https from 'https';
import http from 'http';
import path from 'path';
import fs from 'fs';

const app = express();
const NOT_FOUND_CODE = 404;
const SSL_DIR_PATH = path.normalize(path.join(__dirname, '/..', 'ssl'));
const SSL_CERT_PATH = path.join(SSL_DIR_PATH, 'host.crt');
const SSL_KEY_PATH = path.join(SSL_DIR_PATH, 'host.key');

let server: http.Server;

// TODO: change logic to export
// eslint-disable-next-line no-sync
if (fs.existsSync(SSL_CERT_PATH) && fs.existsSync(SSL_KEY_PATH)) {
  // TODO: add Logging SSL
  console.log('server starts in TLS mode');
  const sslConfig: https.ServerOptions = {
    // eslint-disable-next-line no-sync
    cert: fs.readFileSync(SSL_CERT_PATH),
    // eslint-disable-next-line no-sync
    key: fs.readFileSync(SSL_KEY_PATH)
  };

  server = https.createServer(sslConfig, app);
} else {
  // TODO: add Logging NOT SSL
  console.log('server starts in noTLS mode');
  server = http.createServer({}, app);
}

// fallback
app.get('*', (req, res) => {
  res.send('AHHH NOT FOUND');
  res.status(NOT_FOUND_CODE);
});

export async function start(port: number): Promise<void> {
  return new Promise(resolve => server.listen(port, resolve));
}
