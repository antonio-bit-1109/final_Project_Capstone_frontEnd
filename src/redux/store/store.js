import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import expireReducer from "redux-persist-expire";
import tokenReducer from "../reducers/tokenReducer";
import prodottiReducer from "../reducers/prodottiReducer";
import eserciziReducer from "../reducers/eserciziReducer";
import allenamentiReducer from "../reducers/allenamentiReducer";
import allenamentiCompletatiReducer from "../reducers/allenamentiCompletatiReducer";
import utentiReducer from "../reducers/utentiReducer";
import notificaReducer from "../reducers/notificaReducer";
import bonusReducer from "../reducers/bonusReducer";
import backOfficeReducer from "../reducers/backOfficeReducer";
import backOffice2Reducer from "../reducers/backOffice2Reducer";
import showDivLogin from "../reducers/showDivLogin";

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["token", "prodotti", "utenti", "allenamenti"], //aggiungi il reducer che vuoi venga mantenuto
    transforms: [
        expireReducer("token", {
            expireSeconds: 7 * 24 * 60 * 60, // 7 days
            expiredState: { TokenUtente: null, DatiUtenteLoggato: null },
            autoExpire: true,
        }),
        expireReducer("prodotti", {
            expireSeconds: 60 * 60 * 24, // 1 day
            expiredState: { CarrelloOttimizzato: [], carrelloProdotti: [] },
            autoExpire: true,
        }),
        expireReducer("utenti", {
            expireSeconds: 7 * 24 * 60 * 60, // 1 day
            expiredState: { TuttiDettagliUtenteLoggato: null },
            autoExpire: true,
        }),
        expireReducer("allenamenti", {
            expireSeconds: 60 * 60 * 3, // 3 hours
            expiredState: { AllenamentoSceltogiaCreato: null },
            autoExpire: true,
        }),
    ],
};

const rootReducer = combineReducers({
    token: tokenReducer,
    prodotti: prodottiReducer,
    esercizi: eserciziReducer,
    allenamenti: allenamentiReducer,
    utenti: utentiReducer,
    allenamentiCompletati: allenamentiCompletatiReducer,
    notifica: notificaReducer,
    bonus: bonusReducer,
    backOffice: backOfficeReducer,
    BackOffice2: backOffice2Reducer,
    ShowDivLogin: showDivLogin,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
