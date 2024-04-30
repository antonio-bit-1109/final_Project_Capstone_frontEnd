// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    UtenteAppenaRegistrato: null,
    TuttiDettagliUtenteLoggato: null,
    GenderUtente: null,
    TuttiUtenti: null,
};

const stateReducerSlice = createSlice({
    name: "stateReducerSlice",
    initialState,
    reducers: {
        // Azione definita nello slice
        setUtenteAppenaRegistrato: (state, action) => {
            state.UtenteAppenaRegistrato = action.payload;
        },

        setTuttiDettagliUtenteLoggato: (state, action) => {
            state.TuttiDettagliUtenteLoggato = action.payload;
        },

        svuotaTuttiDettagliUtenteLoggato: (state) => {
            state.TuttiDettagliUtenteLoggato = null;
        },

        setGenderUtente: (state, action) => {
            state.GenderUtente = action.payload;
        },

        setTuttiUtenti: (state, action) => {
            state.TuttiUtenti = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const {
    setUtenteAppenaRegistrato,
    setTuttiDettagliUtenteLoggato,
    svuotaTuttiDettagliUtenteLoggato,
    setGenderUtente,
    setTuttiUtenti,
} = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
