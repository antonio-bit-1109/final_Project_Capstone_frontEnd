import { toast } from "react-toastify";
import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";
import {
    setallenamentoInviatoAlServer,
    setdatiAllenamentoRitorno_server,
    setDatiAllenamentoCompletato,
    setlistaAllenamenti,
    setAllenamentoCancellato,
} from "../reducers/allenamentiReducer";

export const PostAllenamento = (urlPath, objPost) => async (dispatch) => {
    try {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objPost),
        };
        dispatch(setallenamentoInviatoAlServer(objPost));
        const response = await fetchWithAuth(urlPath, options);

        const serverResponse = await response.json();

        if (serverResponse.Message === "Errore nella creazione dell'allenamento") {
            throw new Error("Errore nella creazione dell'allenamento");
        }

        dispatch(setdatiAllenamentoRitorno_server(serverResponse));
        //  dispatch(setFirstState(data));
    } catch (Error) {
        console.log(Error);
    }
};

export const PostAllenamentoConcluso = (urlPath, idAllenamento, kcalBruciate) => async (dispatch) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ IdAllenamento: idAllenamento }),
    };

    const response = await fetchWithAuth(urlPath, options);
    console.log(response);

    if (response.ok) {
        const serverResponse = await response.json();
        console.log(serverResponse);
        dispatch(setDatiAllenamentoCompletato(serverResponse));
        toast.success(" Complimenti, Hai terminato l'allenamento!", {
            autoClose: 2000,
        });

        const sendDataKcal = await fetchWithAuth(LocalHostPath + "/Allenamento/aggiornaKcalConsumateUtente", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(kcalBruciate),
        });

        console.log(sendDataKcal);
    }

    if (!response.ok) {
        toast.error("Errore durante il completamento dell'allenamento", {
            autoClose: 2000,
        });
    }
};

export const GetListaAllenamenti = (urlPath) => async (dispatch) => {
    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetchWithAuth(urlPath, options);
    console.log(response);

    const serverResponse = await response.json();
    console.log(serverResponse);
    dispatch(setlistaAllenamenti(serverResponse));
    // dispatch(setDatiAllenamentoCompletato(serverResponse));
};

export const AllenamentoFiltrato = (inputNome, difficoltaAllenamento) => async (dispatch) => {
    try {
        console.log(inputNome, difficoltaAllenamento);
        const request = await fetchWithAuth(LocalHostPath + "/Allenamento/AllenamentoFiltrato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ NomeAllenamentoInput: inputNome, difficoltainput: difficoltaAllenamento }),
        });

        const response = await request.json();
        console.log(response);
        if (!response.status) {
            dispatch(setlistaAllenamenti(response));
        } else {
            throw new Error("Errore nella ricerca dell'allenamento");
        }
    } catch (err) {
        console.error(err);
    }
};

export const CancellaAllenamento = (urlPath) => async (dispatch) => {
    const options = {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    };
    const response = await fetchWithAuth(urlPath, options);
    console.log(response);

    const serverResponse = await response.json();
    console.log(serverResponse);
    dispatch(setAllenamentoCancellato(serverResponse));
};
