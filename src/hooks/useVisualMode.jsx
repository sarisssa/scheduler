import { useState } from "react";

export default function useVisualMode(initial, replace) {

    const [mode, setMode] = useState(initial); //Set initial mode state

    const [history, setHistory] = useState([initial]); //Store history of modes

    let newHistory = [...history]; //Use newHistory as mutating state directly is an anti-pattern

    const transition = (newMode, replace = false) => {
        if (replace) newHistory.pop();

        newHistory.push(newMode) // Push new mode to end of history.
        setHistory(newHistory); 
        setMode(newHistory[newHistory.length - 1]); 
    }

    //Transition mode to the previous item in history array.
    const back = () => {
        if (newHistory.length > 1) newHistory.pop(); // Only pop history if stack length is greater than 1

        setHistory(newHistory);
        setMode(newHistory[newHistory.length - 1]);
    }

    return { mode, transition, back };
}