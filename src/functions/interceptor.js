// Il file interceptor.js sembra essere un modulo JavaScript che definisce una funzione fetchWithAuth per eseguire richieste di rete con autorizzazione.

// In particolare, questa funzione fetchWithAuth accetta due argomenti: url e options. L'argomento url rappresenta l'URL a cui viene inviata la richiesta, mentre l'argomento options è un oggetto opzionale che contiene le opzioni per la richiesta fetch.

// All'interno della funzione, viene utilizzato il modulo store importato da "../redux/store/store" per ottenere il token di autenticazione dallo store Redux. Il token viene quindi utilizzato per impostare l'intestazione di autorizzazione nella richiesta fetch.

// L'intestazione di autorizzazione viene costruita concatenando il token alla stringa "Bearer " utilizzando la sintassi delle template literal di JavaScript. Questo assicura che il token venga inviato correttamente come parte dell'intestazione di autorizzazione nella richiesta fetch.

import { store } from "../redux/store/store";

export async function fetchWithAuth(url, options = {}) {
    // Ottieni il token dallo store Redux
    const state = store.getState();
    const token = state.token.TokenUtente;

    // Imposta l'intestazione di autorizzazione
    const headers = {
        ...options.headers,
        Authorization: `Bearer ${token}`,
    };

    // Esegui la richiesta fetch con le nuove intestazioni
    const response = await fetch(url, { ...options, headers });

    return response;
}
