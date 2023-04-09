const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const path = require('node:path');
const socketEndpoints = require("./src/backend/Socket/SocketHandler");
const port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, 'build')));

const onConnection = (socket) => {
    console.debug('Connection opened with ' + socket.conn.transport.name + ' transport');
    socket.conn.on("upgrade", () => {
        console.log('Connection upgraded to ' + socket.conn.transport.name + ' transport');
    });

    socketEndpoints(io, socket);
}
io.on('connection', onConnection);

server.listen(port, () => {
    console.log('Listening on *:' + port);
});
