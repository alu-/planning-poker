import {useSelector} from "react-redux";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import distinctColors from 'distinct-colors'

ChartJS.register(ArcElement, Tooltip, Legend);

export function VotingSummary() {
    const allHasVoted = useSelector(state => {
        return state.vote.users.length !== 0 && Object.keys(state.vote.votes).length === state.vote.users.length;
    });
    const votes = useSelector(state => state.vote.votes);
    const voteValues = useSelector(state => Object.values(state.vote.votes).filter(v => Number.isInteger(v)));
    const low = Math.min(...voteValues) || "?";
    const high = Math.max(...voteValues) || "?";

    const sum = voteValues.reduce((a, b) => a + b, 0);
    const avg = (sum / voteValues.length) || "?";

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

    let palette = distinctColors(votes.length);
    let pieData = {
        labels: [],
        datasets: [
            {
                label: 'Points',
                data: [],
                backgroundColor: [],
                borderColor: [],
                borderWidth: 1
            }
        ]
    };
    for (const [username, vote] of Object.entries(votes)) {
        pieData.labels.push(username);
        pieData.datasets[0].data.push(vote);

        const color = palette.pop();
        pieData.datasets[0].backgroundColor.push(color.css());
        pieData.datasets[0].borderColor.push(color.darken(0.4).css());
    }

    return (
        <div className={"flex flex-row flex-wrap items-center justify-center gap-2"}>
            <div>
                <ul>
                    <li>Lowest: {Number.isFinite(low) ? low : "?"}</li>
                    <li>Highest: {Number.isFinite(high) ? high : "?"}</li>
                    <li>Mean: {avg} {averageFibonacciText}</li>
                </ul>
            </div>

            <div>
                <Pie data={pieData} />
            </div>
        </div>
    );
}
