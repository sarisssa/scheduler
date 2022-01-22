import { useState } from "react";

export default function useVisualMode(initial, replace) {

    const [mode, setMode] = useState(initial); //Set initial mode state

    const [history, setHistory] = useState([initial]); //Store history of modes

    const transition = (newMode, replace = false) => {
        if (replace) setMode(newMode);

        else {
            setMode(newMode);
            setHistory((prev) => [...prev, newMode]); //Spread previous history and newMode into history array
        }
    }

    //Transition mode to the previous item in history array.
    const back = () => {
        if (history.length > 1) history.pop(); // Only pop history if stack length is greater than 1

        setMode(history[history.length - 1]); // Set mode to be the end of history array
    }

    return { mode, transition, back };
}