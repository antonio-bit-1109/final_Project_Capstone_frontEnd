// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idProdotto: null,
    immagineProdotto: null,
    WidthWindows: window.innerWidth,
    datiprodotto: {
        nomeProdotto: "",
        PrezzoProdotto: "",
        DescrizioneProdotto: "",
    },
    showModale: false,
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

        impostaWidthWindow: (state, action) => {
            state.WidthWindows = action.payload;
        },

        isModalVisible: (state, action) => {
            state.showModale = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { salvaIdProdotto, SetImmagineProdotto, SalvaDatiprodotto, impostaWidthWindow, isModalVisible } =
    stateReducerSlice.actions;
export default stateReducerSlice.reducer;
