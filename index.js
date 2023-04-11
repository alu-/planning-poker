const express = require('express');
const app = express();
const http = require('http');
const https = require("https");
const fs = require("fs");
const options = {
    key: fs.readFileSync("/etc/letsencrypt/live/planning-poker.io/privkey.pem", 'utf8'),
    cert: fs.readFileSync("/etc/letsencrypt/live/planning-poker.io/cert.pem", 'utf8'),
    ca: fs.readFileSync('/etc/letsencrypt/live/yourdomain.com/chain.pem', 'utf8')
};
const httpServer = https.createServer(options, app);
const httpsServer = https.createServer(options, app);
const {Server} = require("socket.io");
const io = new Server(httpsServer);
const path = require('node:path');
const socketEndpoints = require("./src/backend/Socket/SocketHandler");
const httpPort = process.env.PORT || 80;
const https_port = process.env.HTTPS_PORT || 443;

app.use(express.static(path.join(__dirname, 'build')));

const onConnection = (socket) => {
    console.debug('Connection opened with ' + socket.conn.transport.name + ' transport');
    socket.conn.on("upgrade", () => {
        console.log('Connection upgraded to ' + socket.conn.transport.name + ' transport');
    });

    socketEndpoints(io, socket);
}
io.on('connection', onConnection);

httpServer.listen(httpPort, "0.0.0.0", () => {
    console.log('Listening on *:' + httpPort);
});
httpsServer.listen(https_port, "0.0.0.0", () => {
    console.log('Listening on *:' + https_port);
});
