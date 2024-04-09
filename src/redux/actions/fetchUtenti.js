import { toast } from "react-toastify";
import { setTuttiDettagliUtenteLoggato, setUtenteAppenaRegistrato } from "../reducers/utentiReducer";
import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";
// import { rimuoviTuttoDalCArrello, setCarrelloOttimizzato } from "../reducers/prodottiReducer";
// import { SvuotaArrayAllenamento, setnomeAllenamentoCreato } from "../reducers/allenamentiReducer";
// import { setDatiutenteLoggato, setTokenUtente } from "../reducers/tokenReducer";
// import { rimuoviTuttiAllenamentiCompletatiUtente } from "../reducers/allenamentiCompletatiReducer";
// import { setDatiutenteLoggato, setTokenUtente } from "../reducers/tokenReducer";
// import { SvuotaArrayAllenamento, setnomeAllenamentoCreato } from "../reducers/allenamentiReducer";
// import { rimuoviTuttoDalCArrello, setCarrelloOttimizzato } from "../reducers/prodottiReducer";
// import { rimuoviTuttiAllenamentiCompletatiUtente } from "../reducers/allenamentiCompletatiReducer";

export const PostUtenteRegistrato = (urlPath, objPost) => async (dispatch) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objPost),
        };
        const response = await fetch(urlPath, options);
        console.log(response);

        if (response.status === 200 && response.ok) {
            toast.success("Utente registrato con successo!");
        }

        const serverResponse = await response.json();
        console.log(serverResponse);

        await dispatch(setUtenteAppenaRegistrato(serverResponse));

        await fetchWithAuth(LocalHostPath + "/Email/sendConfermaIscrizione", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objPost),
        });
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
    }
};

export const CambiaImmagine = (idutente, formData) => async (dispatch) => {
    try {
        const sendData = await fetchWithAuth(LocalHostPath + `/Utente/cambiaImmagineProfilo/${idutente}`, {
            method: "POST",
            body: formData,
        });

        const response = await sendData.json();

        if (response) {
            console.log(response);
            toast.success("Immagine cambiata con successo!");
            dispatch(getDettagliUtente());
            // dispatch(setTokenUtente(null));
            // dispatch(setDatiutenteLoggato(null));
            // dispatch(SvuotaArrayAllenamento());
            // dispatch(setnomeAllenamentoCreato(""));
            // dispatch(rimuoviTuttoDalCArrello());
            // dispatch(setCarrelloOttimizzato([]));
            // dispatch(rimuoviTuttoDalCArrello());
            // dispatch(rimuoviTuttiAllenamentiCompletatiUtente());
        }
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};

export const getDettagliUtente = () => async (dispatch) => {
    const request = await fetchWithAuth(LocalHostPath + `/Utente/getInfoUtente`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const response = await request.json();
    dispatch(setTuttiDettagliUtenteLoggato(response));
};
