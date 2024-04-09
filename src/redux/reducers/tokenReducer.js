// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    TokenUtente: null,
    DatiUtenteLoggato: null,
};

const stateReducerSlice = createSlice({
    name: "stateReducerSlice",
    initialState,
    reducers: {
        // Azione definita nello slice
        setTokenUtente: (state, action) => {
            state.TokenUtente = action.payload;
        },

        setDatiutenteLoggato: (state, action) => {
            state.DatiUtenteLoggato = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { setTokenUtente, setDatiutenteLoggato } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
