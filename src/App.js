import {Login} from "./Login";
import {Players} from "./Players";
import {useSelector} from "react-redux";
import "./App.css";
import {VotingCards} from "./VotingCards";
import {ResetButton} from "./ResetButton";

function App() {
    const username = useSelector(state => state.user.name);
    const isLoggedIn = useSelector(state => state.user.name !== null);

    return (
        <div className="App">
            <div className={"container mx-auto"}>
                <header className={"mb-5"}>
                    <p>Scrum Poker — ♠ ♥ ♦ ♣</p>
                    {isLoggedIn && <p className={"mt-1"}>You are logged in as <i>{username}</i>.</p>}
                </header>

                {!isLoggedIn && <Login/>}
                {isLoggedIn && <Players/>}
                {isLoggedIn && <VotingCards/>}
                {isLoggedIn && <ResetButton/>}
            </div>
        </div>
    );
}

export default App;
