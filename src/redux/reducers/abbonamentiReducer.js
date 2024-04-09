// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ListaAbbonamenti: null,
};

const stateReducerSlice = createSlice({
    name: "stateReducerSlice",
    initialState,
    reducers: {
        // Azione definita nello slice
        SetListaAbbonamenti: (state, action) => {
            state.ListaAbbonamenti = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { SetListaAbbonamenti } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
