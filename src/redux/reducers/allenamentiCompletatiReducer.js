// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    AllenamentiCompletatiUtente: null,
    DettagliAllenamentiCompletatiUtente: null,
};

const stateReducerSlice = createSlice({
    name: "allenamentiCompletati",
    initialState,
    reducers: {
        // Azione definita nello slice
        setAllenamentiCompletatiUtente: (state, action) => {
            state.AllenamentiCompletatiUtente = action.payload;
        },

        rimuoviTuttiAllenamentiCompletatiUtente: (state) => {
            state.AllenamentiCompletatiUtente = null;
        },

        setDettagliAllenamentiCompletatiUtente: (state, action) => {
            state.DettagliAllenamentiCompletatiUtente = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const {
    setAllenamentiCompletatiUtente,
    rimuoviTuttiAllenamentiCompletatiUtente,
    setDettagliAllenamentiCompletatiUtente,
} = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
