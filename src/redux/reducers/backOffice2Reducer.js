// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idProdotto: null,
    immagineProdotto: null,
    datiprodotto: {
        nomeProdotto: "",
        PrezzoProdotto: "",
        DescrizioneProdotto: "",
    },
};

const stateReducerSlice = createSlice({
    name: "backOffice2",
    initialState,
    reducers: {
        salvaIdProdotto: (state, action) => {
            state.idProdotto = action.payload;
        },

        SetImmagineProdotto: (state, action) => {
            state.immagineProdotto = action.payload;
        },

        SalvaDatiprodotto: (state, action) => {
            state.datiprodotto = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { salvaIdProdotto, SetImmagineProdotto, SalvaDatiprodotto } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
