// slice per il salvataggio del token utente
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
    allenamentoPersonalizzatoUtente: [],
    AlertIsPresente: false,
    nomeAllenamentoCreato: "",
    nomeAllenamento_DatiInviati: null,
    datiAllenamentoRitorno_server: null,
    datiAllenamentoCompletato: null,
    listaAllenamentiDisponibili: null,
    AllenamentoSceltogiaCreato: null,
    AllenamentoCancellato: null,
};

const stateReducerSlice = createSlice({
    name: "stateReducerSlice",
    initialState,
    reducers: {
        // Azione definita nello slice
        PushInArrayAllenamento: (state, action) => {
            let allenamento = action.payload;

            let isPresente = state.allenamentoPersonalizzatoUtente.find(
                (es) => es.idEsercizio === allenamento.idEsercizio
            );

            if (isPresente) {
                toast.warning("esercizio già inserito.", { position: "top-left", autoClose: 2000 });
                state.AlertIsPresente = true;
                return;
            }

            state.AlertIsPresente = false;
            state.allenamentoPersonalizzatoUtente.push(allenamento);
            toast.success("Esercizio aggiunto al tuo allenamento", {
                position: "top-left",
                autoClose: 2000,
            });
        },

        SvuotaArrayAllenamento: (state) => {
            state.allenamentoPersonalizzatoUtente = [];
        },

        RimuoviEsercizioDaArray: (state, action) => {
            state.allenamentoPersonalizzatoUtente = state.allenamentoPersonalizzatoUtente.filter(
                (esercizio) => esercizio.idEsercizio !== action.payload
            );
        },

        setnomeAllenamentoCreato: (state, action) => {
            state.nomeAllenamentoCreato = action.payload;
        },

        setallenamentoInviatoAlServer: (state, action) => {
            state.nomeAllenamento_DatiInviati = action.payload;
        },

        setdatiAllenamentoRitorno_server: (state, action) => {
            state.datiAllenamentoRitorno_server = action.payload;
        },

        setDatiAllenamentoCompletato: (state, action) => {
            state.datiAllenamentoCompletato = action.payload;
        },

        setlistaAllenamenti: (state, action) => {
            state.listaAllenamentiDisponibili = action.payload;
        },

        setAllenamentoSceltogiaCreato: (state, action) => {
            state.AllenamentoSceltogiaCreato = action.payload;
        },

        setAllenamentoCancellato: (state, action) => {
            state.AllenamentoCancellato = action.payload;
        },
    },
});

// Esporto solo l'azione definita nello slice
export const {
    PushInArrayAllenamento,
    SvuotaArrayAllenamento,
    setnomeAllenamentoCreato,
    setallenamentoInviatoAlServer,
    setdatiAllenamentoRitorno_server,
    setDatiAllenamentoCompletato,
    setlistaAllenamenti,
    setAllenamentoSceltogiaCreato,
    setAllenamentoCancellato,
    RimuoviEsercizioDaArray,
} = stateReducerSlice.actions;
export default stateReducerSlice.reducer;
