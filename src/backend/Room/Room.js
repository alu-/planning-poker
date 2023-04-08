module.exports = class Room {
    constructor(name) {
        this.name = name;
        this.players = new Set();
        this.votes = {}
        this.votingDone = false;
        this.history = []
    }

    createPlayer(name) {
        this.players.add(name);
    }

    deletePlayer(name) {
        this.players.delete(name);
        delete this.votes[name];
    }

    hasPlayer(name) {
        return this.players.has(name);
    }

    getPlayers() {
        return this.players;
    }

    isEmpty() {
        return this.players.size === 0;
    }

    hasAllPlayersVoted() {
        return Object.keys(this.votes).length === this.players.size;
    }

    isVotingDone() {
        return this.votingDone;
    }

    registerVote(player, vote) {
        this.votes[player] = vote;
    }

    getVotes() {
        return this.votes;
    }

    endVoting() {
        this.votingDone = true;
    }

    resetVotes() {
        this.votes = {};
        this.votingDone = false;
    }
}