import socket from './Socket';
import { Transition } from '@headlessui/react'
import {Error} from "./Error";
import {Login} from "./Login";
import {Players} from "./Players";
import {VotingSummary} from "./VotingSummary";
import {useSelector} from "react-redux";
import {VotingCards} from "./VotingCards";
import {ResetButton} from "./ResetButton";
import "./App.css";
import {useState} from "react";

function App() {
    const username = useSelector(state => state.user.name);
    const roomId = useSelector(state => state.user.roomId);
    const isLoggedIn = useSelector(state => state.user.name !== null);
    const [connectionError, setConnectionError] = useState(false);

    socket
        .on("connect", () => {
            setConnectionError(false);
        })
        .on("connect_error", (error) => {
            setConnectionError(true);
            console.log(error);
        })
        .on('disconnect', (reason, details) => {
            setConnectionError(true);
            console.log(reason);
        });

    return (
        <div className="App">
            <div className={"container mx-auto"}>
                <header className={"m-5 text-center"}>
                    <h1 className={"text-xl antialiased"}>Planning poker — ♥ ♦ ♣ ♠</h1>
                    {isLoggedIn && <p className={"mt-1"}>You are logged in as <i>{username}</i> in <i>{roomId}</i>.</p>}
                </header>

                <Transition
                    show={connectionError}
                    enter="transition-opacity duration-150"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity duration-150"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Error message="There is a problem with your connection, retrying .." />
                </Transition>

                {!isLoggedIn && <Login/>}
                {isLoggedIn && <Players/>}
                {isLoggedIn && <VotingSummary/>}
                {isLoggedIn && <VotingCards/>}
                {isLoggedIn && <ResetButton/>}
            </div>
        </div>
    );
}

export default App;
