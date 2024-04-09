// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaProdotti: null,
    carrelloProdotti: [],
    CarrelloOttimizzato: [],
    prodottoAppenaCreato: null,
};

const stateReducerSlice = createSlice({
    name: "stateReducerSlice",
    initialState,
    reducers: {
        // Azione definita nello slice
        setlistaProdotti: (state, action) => {
            state.listaProdotti = action.payload;
        },

        aggiungiAlcarrelloProdotti: (state, action) => {
            state.carrelloProdotti.push(action.payload);
        },

        rimuoviTuttoDalCArrello: (state) => {
            state.carrelloProdotti = [];
        },

        setCarrelloOttimizzato: (state, action) => {
            state.CarrelloOttimizzato = action.payload;
        },

        setProdottoAppenaCreato: (state, action) => {
            state.prodottoAppenaCreato = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const {
    setlistaProdotti,
    aggiungiAlcarrelloProdotti,
    rimuoviTuttoDalCArrello,
    setCarrelloOttimizzato,
    setProdottoAppenaCreato,
} = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
