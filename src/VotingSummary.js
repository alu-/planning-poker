import {useSelector} from "react-redux";

export function VotingSummary() {
    const allHasVoted = useSelector(state => {
        return state.vote.users.length !== 0 && Object.keys(state.vote.votes).length === state.vote.users.length;
    });
    const votes = useSelector(state => Object.values(state.vote.votes).filter(v => Number.isInteger(v)));
    const low = Math.min(...votes) || "?";
    const high = Math.max(...votes) || "?";

    const sum = votes.reduce((a, b) => a + b, 0);
    const avg = (sum / votes.length) || "?";

    const findClosestFibonacciNumber = (number) => {
        number = Math.ceil(number);
        if (!Number.isInteger(number)) {
            return "?";
        }
        const fibonacci = [1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

        while (number <= Math.max(...fibonacci)) {
            if (fibonacci.includes(number)) {
                return number;
            } else {
                number += 1;
            }
        }

        return "?";
    };

    const avgFib = findClosestFibonacciNumber(avg);

    let averageFibonacciText = "";
    if (avg !== avgFib) {
        averageFibonacciText = `(Closest fibonacci number is ${avgFib})`
    }


    if (!allHasVoted) {
        return null;
    }

    return (
        <div className={"flex flex-row flex-wrap"}>
            <ul>
                <li>Lowest: {Number.isFinite(low) ? low : "?"}</li>
                <li>Highest: {Number.isFinite(high) ? high : "?"}</li>
                <li>Mean: {avg} {averageFibonacciText}</li>
            </ul>
        </div>
    );
}
