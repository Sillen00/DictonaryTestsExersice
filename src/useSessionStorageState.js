import { useEffect, useState } from "react";

// Loads data from Session Storage if key exists, otherwise creates key with initialData
export function useSessionStorageState(initialState, key) {
    const [state, setState] =
        useState <
        State >
        (() => {
            // If key exists, gather data
            const ssState = sessionStorage.getItem(key);
            if (ssState) {
                return JSON.parse(ssState);
            }
            // Creates new key with initial values
            return initialState;
        });

    // Define an effect to update the Session Storage data whenever the "state" variable changes
    useEffect(() => {
        sessionStorage.setItem(key, JSON.stringify(state));
    }, [state]);

    return [state, setState];
}
