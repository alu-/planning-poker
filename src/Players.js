import {useEffect} from "react";
import socket from "./Socket";
import {Player} from "./Player";
import {useDispatch, useSelector} from "react-redux";
import {registerVotes, resetVotes, userHasVoted} from "./redux/slices/voteSlice";
import {add, remove} from "./redux/slices/playerSlice";

export function Players() {
    const players = useSelector(state => state.player.players);
    const dispatch = useDispatch();

    useEffect(() => {
        socket
            .emit("Players.List", (players) => {
                players.forEach(player => dispatch(add(player)));
            })
            .on("Players.Add", (player) => {
                dispatch(add(player));
            })
            .on("Players.Remove", (player) => {
                dispatch(remove(player));
            })
            .on("Vote.HasVoted", (user) => {
                console.log(`${user} has voted`);
                dispatch(userHasVoted(user));
            })
            .on("Vote.Votes", (votes) => {
                console.log(votes);
                dispatch(registerVotes(votes));
            })
            .on("Vote.Reset", () => {
                console.log("vote reset");
                dispatch(resetVotes());
            });
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div id={"board"} className={"flex flex-row flex-wrap items-center justify-center"}>
            {players.map((player) => {
                return (
                    <Player
                        key={player}
                        name={player}
                    />
                );
            })}
        </div>
    );
}
