// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    ListaTrainers: null,
};

const stateReducerSlice = createSlice({
    name: "stateReducerSlice",
    initialState,
    reducers: {
        // Azione definita nello slice
        SetListaTrainers: (state, action) => {
            state.ListaTrainers = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { SetListaTrainers } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
