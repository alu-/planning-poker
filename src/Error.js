import {Roller} from "react-css-spinners";

export function Error({ message }) {
    return (
        <div className={"fixed top-0 bottom-0 left-0 right-0 h-screen w-screen bg-slate-400/75"}>
            <p className={"text-center w-screen absolute top-2/4"}>
                <Roller color={"#000000"} />
                <br />
                {message}
            </p>
        </div>
    );
}
