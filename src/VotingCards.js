import socket from "./Socket";
import {useDispatch, useSelector} from "react-redux";
import {setMyVote} from "./redux/slices/voteSlice";

export function VotingCards() {
    const allHasVoted = useSelector(state => {
        return state.vote.users.length !== 0 && Object.keys(state.vote.votes).length === state.vote.users.length;
    });
    const myVote = useSelector(state => state.vote.myVote);
    const dispatch = useDispatch();
    const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89, "?"];

    const vote = (number) => {
        if (!allHasVoted) {
            dispatch(setMyVote(number));
            socket.emit("Vote", number);
        }
    };

    return (
        <div className={"flex flex-row flex-wrap"}>
            {fibonacci.map((number) => {
                let wrapperClasses = ["flex", "items-center", "justify-center", "border-2", "border-blue-500", "rounded", "m-2", "w-20", "h-24"];
                let textColor = "text-blue-700";
                if (myVote !== false && number === myVote) {
                    wrapperClasses.push("bg-blue-400");
                    textColor = "text-blue-00";
                }

                if (!allHasVoted) {
                    wrapperClasses = wrapperClasses.concat(["hover:border-4", "cursor-pointer"]);
                }

                return (
                    <div
                        key={number}
                        className={wrapperClasses.join(" ")}
                        onClick={() => vote(number)}
                    >
                        <span className={`${textColor} font-bold text-xl`}>{number}</span>
                    </div>
                );
            })}
        </div>
    );
}
