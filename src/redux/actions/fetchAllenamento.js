import { fetchWithAuth } from "../../functions/interceptor";
import {
    setallenamentoInviatoAlServer,
    setdatiAllenamentoRitorno_server,
    setDatiAllenamentoCompletato,
    setlistaAllenamenti,
    setAllenamentoCancellato,
} from "../reducers/allenamentiReducer";

export const PostAllenamento = (urlPath, objPost) => async (dispatch) => {
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
    dispatch(setdatiAllenamentoRitorno_server(serverResponse));
    //  dispatch(setFirstState(data));
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
