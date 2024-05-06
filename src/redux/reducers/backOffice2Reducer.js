// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idProdotto: null,
};

const stateReducerSlice = createSlice({
    name: "backOffice2",
    initialState,
    reducers: {
        salvaIdProdotto: (state, action) => {
            state.idProdotto = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const { salvaIdProdotto } = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
