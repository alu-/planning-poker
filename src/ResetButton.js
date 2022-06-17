import socket from "./Socket";

export function ResetButton() {
    const reset = () => {
        if (window.confirm("Are you sure you want to reset all votes for all users?")) {
            socket.emit("Vote.Reset");
        }
    };

    return (
        <div className={"flex flex-row flex-wrap"}>
            <button onClick={reset} className={"mt-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}>RESET</button>
        </div>
    );
}
