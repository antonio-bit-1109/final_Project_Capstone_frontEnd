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

export const PostAllenamentoConcluso = (urlPath, objPost) => async (dispatch) => {
    const options = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(objPost),
    };
    const response = await fetchWithAuth(urlPath, options);
    console.log(response);

    const serverResponse = await response.json();
    console.log(serverResponse);
    dispatch(setDatiAllenamentoCompletato(serverResponse));
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

export const AllenamentoFiltrato = (inputNome) => async (dispatch) => {
    try {
        const request = await fetchWithAuth(LocalHostPath + "/Allenamento/AllenamentoFiltrato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(inputNome),
        });

        const response = await request.json();
        dispatch(setlistaAllenamenti(response));
    } catch (err) {
        console.log(err);
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
