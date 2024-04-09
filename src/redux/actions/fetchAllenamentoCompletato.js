import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";
import {
    setAllenamentiCompletatiUtente,
    setDettagliAllenamentiCompletatiUtente,
} from "../reducers/allenamentiCompletatiReducer";

export const getAllenamentiCompletati = (idutente, urlPath) => async (dispatch) => {
    try {
        const dataTake = await fetchWithAuth(LocalHostPath + urlPath + `${idutente}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (dataTake.ok) {
            const dataAllenamentiCompleted = await dataTake.json();

            dispatch(setAllenamentiCompletatiUtente(dataAllenamentiCompleted));
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        console.log("Huston we have a problem: ", error.message);
    }
};

export const getDettagliAllenamentiCompletatiUtente = (idUtente) => async (dispatch) => {
    try {
        const dataTake = await fetchWithAuth(
            LocalHostPath + `/AllenamentiCompletati/DettagliAllenamentiCompletati/${idUtente}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const response = await dataTake.json();
        console.log(response);
        dispatch(setDettagliAllenamentiCompletatiUtente(response));
    } catch (error) {
        console.log("Huston we have a problem: ", error.message);
    }
};
