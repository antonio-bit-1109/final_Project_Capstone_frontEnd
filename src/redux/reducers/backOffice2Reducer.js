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
    showModaleCreaEsercizio: false,

    showModaleDeleteEsercizio: false,
    idEsercizio: null,
    datiEsercizio: {
        nomeEsercizio: "",
        descrizioneEsercizio: "",
        DifficoltaEsercizio: "",
        IsStrength: true,
        TempoRecupero: "",
        Ripetizioni: "",
        Serie: "",
        met: "",
        ParteDelCorpo: "",
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

        impostaWidthWindow: (state, action) => {
            state.WidthWindows = action.payload;
        },

        isModalVisible: (state, action) => {
            state.showModale = action.payload;
        },

        isModaleCreaEsercizioVisible: (state, action) => {
            state.showModaleCreaEsercizio = action.payload;
        },

        isModaleDeleteEsercizioVisible: (state, action) => {
            state.showModaleDeleteEsercizio = action.payload;
        },

        salvaIdEsercizio: (state, action) => {
            state.idEsercizio = action.payload;
        },

        salvaDatiEsercizio: (state, action) => {
            state.datiEsercizio = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const {
    salvaIdProdotto,
    SetImmagineProdotto,
    SalvaDatiprodotto,
    impostaWidthWindow,
    isModalVisible,
    isModaleCreaEsercizioVisible,
    salvaIdEsercizio,
    isModaleDeleteEsercizioVisible,
    salvaDatiEsercizio,
} = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
