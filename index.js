const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);
const path = require('node:path');
const port = process.env.PORT || 80;

app.use(express.static(path.join(__dirname, 'build')));

let users = new Set();
let votes = {};
let votingDone = false;

io.on('connection', (socket) => {
    console.debug('Connection opened with ' + socket.conn.transport.name + ' transport');

    socket.conn.on("upgrade", () => {
        console.log('Connection upgraded to ' + socket.conn.transport.name + ' transport');

    });

    socket.on('Login', (user) => {
        console.log(`Login event for ${user}`);
        if (users.has(user)) {
            console.log(`User ${user} is already logged in!`);
            socket.emit("Login.Failure", `User ${user} is already logged in!`);
        } else {
            socket.data.username = user;
            users.add(user);
            socket.emit("Login.Success", `User ${user} has been logged in!`);
            socket.broadcast.emit("Players.Add", user);
        }

        socket.on("Players.List", (callback) => {
            console.log(`Players.List request from ${socket.data.username}`);
            callback(Array.from(users));
        });

        socket.on("Vote", async (value) => {
            if (votingDone) {
                console.log(`Vote request ${value} from ${socket.data.username} but voting has ended.`);
                return false;
            }

            console.log(`Vote request ${value} from ${socket.data.username}`);
            votes[socket.data.username] = value;
            io.emit("Vote.HasVoted", socket.data.username);

            if (Object.keys(votes).length === users.size) {
                console.log("All has votes, broadcasting results in three seconds");
                await new Promise(r => setTimeout(r, 3000));
                io.emit("Vote.Votes", votes);
                votingDone = true;
            }
        })

        socket.on("Vote.Reset", () => {
            console.log(`Vote reset request from ${socket.data.username}`);
            votes = {}
            votingDone = false;
            io.emit("Vote.Reset");
        })
    });

    socket.on("disconnect", (reason) => {
        console.log(`Disconnect user "${socket.data.username}" "${reason}"`);
        if (users.has(socket.data.username)) {
            users.delete(socket.data.username)
            delete votes[socket.data.username];
            socket.broadcast.emit("Players.Remove", socket.data.username);
        }

        if (users.size === 0) {
            console.log("No players connected, resetting");
            votes = {}
            votingDone = false;
        }
    });
});

server.listen(port, () => {
    console.log('Listening on *:' + port);
});
