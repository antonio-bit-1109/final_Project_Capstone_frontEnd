// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isFlipped: false,
    showDivAccesso: false,
    showDivRegistration: false,
};

const stateReducerSlice = createSlice({
    name: "ShowDivLogin",
    initialState,
    reducers: {
        isDivFlipped: (state, action) => {
            state.isFlipped = action.payload;
        },

        isDivAccessoVisible: (state, action) => {
            state.showDivAccesso = action.payload;
        },

        isDivRegistrazioneVisible: (state, action) => {
            state.showDivRegistration = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { isDivFlipped, isDivAccessoVisible, isDivRegistrazioneVisible } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
