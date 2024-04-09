// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaEsercizi: [],
    ultimoEsercizioCreato: null,
};

const stateReducerSlice = createSlice({
    name: "stateReducerSlice",
    initialState,
    reducers: {
        // Azione definita nello slice
        setlistaEsercizi: (state, action) => {
            state.listaEsercizi = action.payload;
        },

        setUltimoEsercizioCreato: (state, action) => {
            state.ultimoEsercizioCreato = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { setlistaEsercizi, setUltimoEsercizioCreato } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
