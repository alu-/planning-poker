import React, {useState} from "react";
import {useDispatch} from 'react-redux'
import {login} from './redux/slices/userSlice'
import socket from './Socket';

export function Login() {
    let [roomId, setRoomId] = useState("");
    let [username, setUsername] = useState(localStorage.getItem("username") ?? "");
    let [message, setMessage] = useState("");
    const dispatch = useDispatch();

    const formSubmitHandler = async (event) => {
        event.preventDefault();
        let username = event.target.elements.username.value;
        if (username.length === 0) {
            setMessage("Please specify a username");
            return false;
        }

        socket
            .emit("Login", username, "I-am-a-room")
            .on("Login.Failure", (message) => {
                setMessage(message);
            })
            .on("Login.Success", (message) => {
                localStorage.setItem("username", username);
                dispatch(login(username));
            });
    }

    return (
        <form
            onSubmit={(event) => formSubmitHandler(event)}
            className={"flex flex-col justify-center items-center"}
        >
            {message && <p className={"text-orange-600"}>{message}</p>}
            <label htmlFor={"room"} className={"block"}>
                <span className={"text-gray-700"}>Room ID</span>
                <input type={"text"}
                       autoComplete="off"
                       data-lpignore="true"
                       className={"form-input block mt-1 rounded"}
                       name={"room"}
                       id={"room"}
                       value={roomId}
                       onChange={(event) => setRoomId(event.target.value)}
                />
            </label>
            <label htmlFor={"username"} className={"block"}>
                <span className={"text-gray-700"}>Username</span>
                <input type={"text"}
                       autoComplete="off"
                       data-lpignore="true"
                       className={"form-input block mt-1 rounded"}
                       name={"username"}
                       id={"username"}
                       value={username}
                       onChange={(event) => setUsername(event.target.value)}
                />
            </label>

            <input
                type={"submit"}
                className={"mt-3 w-20 rounded text-sm text-white font-semibold shadow-sm p-1 bg-cyan-500"}
                value={"Login"}
            />
        </form>
    );
}
