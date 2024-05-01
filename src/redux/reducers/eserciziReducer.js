// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaEsercizi: [],
    ultimoEsercizioCreato: null,
    listaTuttiEsercizi: null,
};

const stateReducerSlice = createSlice({
    name: "esercizi",
    initialState,
    reducers: {
        // Azione definita nello slice
        setlistaEsercizi: (state, action) => {
            state.listaEsercizi = action.payload;
        },

        setUltimoEsercizioCreato: (state, action) => {
            state.ultimoEsercizioCreato = action.payload;
        },

        setListaTuttiEsercizi: (state, action) => {
            state.listaTuttiEsercizi = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { setlistaEsercizi, setUltimoEsercizioCreato, setListaTuttiEsercizi } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
