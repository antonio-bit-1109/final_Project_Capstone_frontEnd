import { toast } from "react-toastify";
import { setGenderUtente, setTuttiDettagliUtenteLoggato, setUtenteAppenaRegistrato } from "../reducers/utentiReducer";
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

        // se mi genera il message allora è bad request e non deve proseguire oltre
        if (serverResponse.message === " Email già presente. Cambia la tua mail.") {
            toast.info(serverResponse.message);
            return;
        } else {
            toast.info(serverResponse.message);

            await dispatch(setUtenteAppenaRegistrato(serverResponse));

            const ConfermaIscrizione = await fetchWithAuth(LocalHostPath + "/Email/ConfermaIscrizione", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(objPost),
            });

            if (ConfermaIscrizione.status < 200 || ConfermaIscrizione.status > 300) {
                toast.error("Errore nell'invio della mail di registrazione!");
            } else {
                toast.success("Mail di conferma inviata con successo!");
            }
        }
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

export const GenderUtente = (nomeUtente) => async (dispatch) => {
    try {
        const request = await fetch(
            `https://genderapi.io/api/?key=${import.meta.env.VITE_API_TOKEN_GENDERAPI}&name=${nomeUtente}`,
            { method: "GET" }
        );
        console.log(request);
        if (request.ok) {
            const response = await request.json();
            console.log(response);
            dispatch(setGenderUtente(response));
            return;
        }

        throw new Error("Errore nel fetch");
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};
