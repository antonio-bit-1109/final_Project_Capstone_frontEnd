import { fetchWithAuth } from "../../functions/fetchWithAuth";
import { setFirstState } from "../reducers/stateReducer";
import { setListaUtenti } from "../reducers/utentiReducer";
import { LocalHostUrl } from "../../functions/localHostPath";
import {
    setUtenteCreato,
    setOutputPost,
    setSingoloUtente,
    setEsitoGetUtente,
    setSingoloUtenteModificato,
    setutenteEliminato,
} from "../reducers/utentiReducer";

export const PostLogin = (urlPath, objPost) => async (dispatch) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objPost),
    };
    const response = await fetch(urlPath, options);
    const data = await response.json();
    console.log(data);
    dispatch(setFirstState(data));
};

export const GetUtenti = () => async (dispatch) => {
    try {
        const response = await fetchWithAuth(LocalHostUrl + "/Utente/list", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const dataProfile = await response.json();

            console.log(dataProfile);

            dispatch(setListaUtenti(dataProfile));
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
    }
};

export const PostUtente = (objPost) => async (dispatch) => {
    try {
        const response = await fetchWithAuth(LocalHostUrl + "/Utente/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objPost),
        });

        if (response.ok) {
            const dataProfile = await response.json();

            console.log(dataProfile);

            dispatch(setUtenteCreato(dataProfile));
            dispatch(setOutputPost(true));
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
        dispatch(setOutputPost(false));
    }
};

export const GetSingoloUtente = (idUtente) => async (dispatch) => {
    try {
        const response = await fetchWithAuth(LocalHostUrl + "/Utente/singoloUtente/" + idUtente, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();

            console.log(data);

            dispatch(setSingoloUtente(data));
            dispatch(setEsitoGetUtente(true));
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
        dispatch(setEsitoGetUtente(false));
    }
};

//action per modificare un utente, ed inserire un immagine  due fetch in uno.
export const EditSingoloUtente = (objPost, formData) => async (dispatch) => {
    try {
        const response = await fetchWithAuth(LocalHostUrl + "/Utente/EditUtente", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objPost),
        });

        if (response.ok) {
            const data = await response.json();

            // ritorna idUtente;
            console.log(data);
            dispatch(setSingoloUtenteModificato(data));

            const response2 = await fetchWithAuth(LocalHostUrl + "/Utente/addUtenteImg/" + data.utente.idUtente, {
                method: "POST",
                body: formData,
            });

            if (response2.ok) {
                const data2 = await response2.json();
                console.log(data2);
            }
            // dispatch(setSingoloUtenteModificato(data));
            // dispatch(setEsitoGetUtente(true));
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
        // dispatch(setEsitoGetUtente(false));
    }
};

export const DeleteSingoloUtente = (idUtente) => async (dispatch) => {
    try {
        const response = await fetchWithAuth(`${LocalHostUrl}/Utente/SoftDelete/${idUtente}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const data = await response.json();

            console.log(data);

            dispatch(setutenteEliminato(data));
            // dispatch(setEsitoGetUtente(true));
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
        // dispatch(setEsitoGetUtente(false));
    }
};
