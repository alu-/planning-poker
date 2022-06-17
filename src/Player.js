import {useSelector} from "react-redux";

export function Player(props) {
    const myUsername = useSelector(state => state.user.name);
    const hasVoted = useSelector(state => state.vote.users.includes(props.name));
    const vote = useSelector(state => {
        if (props.name in state.vote.votes) {
            return state.vote.votes[props.name];
        } else {
            return "";
        }
    });

    let wrapperClasses = ["m-2", "p-2", "border", "rounded", "h-24", "w-24", "truncate"];
    if (props.name === myUsername) {
        wrapperClasses.push("text-blue-500");
    }

    return (
        <div className={wrapperClasses.join(" ")}>
            {props.name}
            <h3 className={"text-3xl text-center leading-10"}>
                {vote === "" && hasVoted ? "✓" : ""}
                {vote !== "" && vote}
            </h3>
        </div>
    );
}
