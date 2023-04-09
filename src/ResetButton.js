import socket from "./Socket";
import {useSelector} from "react-redux";

export function ResetButton() {
    const isAdmin = useSelector(state => state.user.isAdmin);
    const reset = () => {
        // TODO: exchange this for a modal
        if (window.confirm("Are you sure you want to reset all votes for all users?")) {
            socket.emit("Vote.Reset");
        }
    };

    return (isAdmin &&
        <div className={"flex flex-row flex-wrap items-center justify-center"}>
            <button onClick={reset} className={"mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>RESET</button>
        </div>
    );
}
