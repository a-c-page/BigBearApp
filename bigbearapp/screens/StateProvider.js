import { useState, createContext } from "react";

export const StateContext = createContext();

export const StateProvider = (props) => {
    const [userID, setUserID] = useState("");
    // Value's that goes through to all components
    const value = {
        userID,
        setUserID,
    };

    return (
        <StateContext.Provider value={value}>
            {props.children}
        </StateContext.Provider>
    );
};
