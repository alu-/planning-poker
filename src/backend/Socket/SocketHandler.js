const RoomHandler = require('../Room/RoomHandler');
const rh = new RoomHandler();

module.exports = (io, socket) => {
    const onLogin = (user, roomId) => {
        console.log(`Login event for ${user} in room ${roomId}`);

        let room;
        if (rh.roomExists(roomId)) {
            console.log("Room exists");
            room = rh.getRoom(roomId);
        } else {
            console.log("Room doesn't exist");
            room = rh.createRoom(roomId);
            room.setAdmin(user);
        }

        if (room.hasPlayer(user)) {
            console.log(`User ${user} is already logged in!`);
            socket.emit("Login.Failure", `User ${user} is already in that room.`);
        } else {
            socket.join(roomId);
            room.createPlayer(user);

            socket.data.username = user;
            socket.data.roomId = roomId;
            socket.emit("Login.Success", {
                message: `User ${user} has been logged in!`,
                isAdmin: room.isAdmin(user)
            });
            socket.broadcast.in(roomId).emit("Players.Add", user);

            const votes = Array.from(Object.keys(room.getVotes()));
            votes.forEach(user => socket.emit("Vote.HasVoted", user));
            if (room.isVotingDone()) {
                socket.emit("Vote.Votes", room.getVotes());
            }

            socket.on("Players.List", onPlayersList);
            socket.on("Vote", onVote);
            socket.on("Vote.Reset", onVoteReset);
        }
    };
    const onPlayersList = callback => {
        console.log(`Players.List request from ${socket.data.username} in room ${socket.data.roomId}`);
        callback(Array.from(rh.getRoom(socket.data.roomId).getPlayers()));
    }
    const onVote = async (value) => {
        const room = rh.getRoom(socket.data.roomId);
        if (room.isVotingDone()) {
            console.log(`Vote request ${value} from ${socket.data.username} but voting has ended.`);
            return false;
        }

        console.log(`Vote request ${value} from ${socket.data.username}`);
        room.registerVote(socket.data.username, value);
        io.sockets.in(socket.data.roomId).emit("Vote.HasVoted", socket.data.username);

        if (room.getPlayers().size > 1 && room.hasAllPlayersVoted()) {
            console.log("All players have voted, broadcasting results in three seconds");
            room.endVoting();
            setTimeout((io, room, socket) => {
                io.sockets.in(socket.data.roomId).emit("Vote.Votes", room.getVotes());
            }, 1500, io, room, socket);
        }
    };
    const onVoteReset = () => {
        console.log(`Vote reset request from ${socket.data.username} in room ${socket.data.roomId}`);
        const room = rh.getRoom(socket.data.roomId);
        if (room.isAdmin(socket.data.username)) {
            io.sockets.in(room.name).emit("Vote.Reset");
            room.resetVotes();
        } else {
            console.log("Warning: reset request from not an admin");
        }
    };
    const onDisconnect = (reason) => {
        console.log(`Disconnect user "${socket.data.username}" "${reason}"`);

        if (socket.data.roomId) {
            const room = rh.getRoom(socket.data.roomId);
            room.deletePlayer(socket.data.username);
            if (room.isEmpty()) {
                console.log(`Room ${socket.data.roomId} is empty, deleting ..`);
                rh.deleteRoom(socket.data.roomId);
            } else {
                socket.broadcast.in(socket.data.roomId).emit("Players.Remove", socket.data.username);
            }
        }
    }

    socket.on('Login', onLogin);
    socket.on("disconnect", onDisconnect);
};