const Room = require('./Room');

module.exports = class RoomHandler {
    constructor() {
        this.rooms = {}
    }

    createRoom(name) {
        this.rooms[name] = new Room(name);
        return this.rooms[name];
    }

    deleteRoom(name) {
        delete this.rooms[name];
    }

    roomExists(name) {
        return name in this.rooms;
    }

    getRoom(name) {
        return this.rooms[name];
    }

    debug() {
        console.log(this);
    }
}