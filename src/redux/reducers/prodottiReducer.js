// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    listaProdotti: null,
    carrelloProdotti: [],
    CarrelloOttimizzato: [],
    prodottoAppenaCreato: null,
    prodottiAcquistati: null,
};

const stateReducerSlice = createSlice({
    name: "prodotti",
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

        rimuoviProdottoDalCarrelloOttimizzato: (state, action) => {
            let array = state.CarrelloOttimizzato;

            for (let i = 0; i < array.length; i++) {
                let prodotto = array[i];
                if (prodotto.idProdotto === action.payload) {
                    if (prodotto.quantita === 1) {
                        array.splice(i, 1);
                        return;
                    }

                    prodotto.quantita--;
                }
            }
        },

        rimuoviProdottoDalCarrello: (state, action) => {
            let array = state.carrelloProdotti;
            let arrayContenitore = [];
            let idProdottoRef = action.payload;
            for (let i = 0; i < array.length; i++) {
                let prodotto = array[i];

                if (arrayContenitore.length !== 0) {
                    return;
                }

                if (prodotto.idProdotto === idProdottoRef) {
                    array.splice(i, 1);
                    arrayContenitore.push(prodotto);
                }
            }
        },

        setCarrelloOttimizzato: (state, action) => {
            state.CarrelloOttimizzato = action.payload;
        },

        setProdottoAppenaCreato: (state, action) => {
            state.prodottoAppenaCreato = action.payload;
        },

        setProdottiAcquistati: (state, action) => {
            state.prodottiAcquistati = action.payload;
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
    setProdottiAcquistati,
    rimuoviProdottoDalCarrelloOttimizzato,
    rimuoviProdottoDalCarrello,
} = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
