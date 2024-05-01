// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    showDivUtenti: false,
    showDivEsercizi: false,
    showDivProdotti: true,
};

const stateReducerSlice = createSlice({
    name: "backOffice",
    initialState,
    reducers: {
        ShowDivUtenti_true: (state) => {
            state.showDivUtenti = true;
        },

        ShowDivUtenti_false: (state) => {
            state.showDivUtenti = false;
        },

        ShowDivEsercizi_true: (state) => {
            state.showDivEsercizi = true;
        },

        ShowDivEsercizi_false: (state) => {
            state.showDivEsercizi = false;
        },

        ShowDivProdotti_true: (state) => {
            state.showDivProdotti = true;
        },

        ShowDivProdotti_false: (state) => {
            state.showDivProdotti = false;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const {
    ShowDivUtenti_true,
    ShowDivUtenti_false,
    ShowDivEsercizi_true,
    ShowDivEsercizi_false,
    ShowDivProdotti_true,
    ShowDivProdotti_false,
} = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
