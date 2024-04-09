import { setTokenUtente, setDatiutenteLoggato } from "../reducers/tokenReducer";

export const TokenFetch = (urlPath, objPost) => async (dispatch) => {
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

    if (data.status) {
        dispatch(setTokenUtente(data.title));
    } else {
        dispatch(setTokenUtente(data.token));
        dispatch(setDatiutenteLoggato(data.utente));
    }
};
