import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";
import { SetListaAbbonamenti } from "../reducers/abbonamentiReducer";

export const GetAbbonamenti = () => async (dispatch) => {
    try {
        const request = await fetchWithAuth(LocalHostPath + "/Abbonamenti/getAbbonamenti", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const serverResponse = await request.json();
        console.log(serverResponse);

        dispatch(SetListaAbbonamenti(serverResponse));
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};
