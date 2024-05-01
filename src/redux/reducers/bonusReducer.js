// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showModalTreasure: false,
};

const stateReducerSlice = createSlice({
    name: "bonus",
    initialState,
    reducers: {
        setModalTreasure_True: (state) => {
            state.showModalTreasure = true;
        },
        setModalTreasure_False: (state) => {
            state.showModalTreasure = false;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { setModalTreasure_True, setModalTreasure_False } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
