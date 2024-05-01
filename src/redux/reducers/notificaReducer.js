// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    CountModale: 0,
};

const stateReducerSlice = createSlice({
    name: "notifica",
    initialState,
    reducers: {
        AddOneCountModale: (state) => {
            state.CountModale++;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { AddOneCountModale } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
