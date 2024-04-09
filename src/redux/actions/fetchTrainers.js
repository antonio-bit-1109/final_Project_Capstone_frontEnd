import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";
import { SetListaTrainers } from "../reducers/trainersReducer";

export const GetTrainers = () => async (dispatch) => {
    try {
        const request = await fetchWithAuth(LocalHostPath + "/AbbonamentoTrainer/getTrainers", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const serverResponse = await request.json();
        console.log(serverResponse);

        dispatch(SetListaTrainers(serverResponse));
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};
