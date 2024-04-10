import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";
import { SetUltimoAbbonamentoCreato } from "../reducers/abbonamentiReducer";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
    "pk_test_51OvOuXF8RKd4FcyTpcXChaAdtZ1fn5O7yY9BDTcEQcY5tlHXiYyc96EQDtnvrJNGTX3EArS1zMT0U03sL5VJSZGf00MjrfcJkf"
);

export const CreaAbbonamento = (objData) => async (dispatch) => {
    try {
        const sendData = await fetchWithAuth(LocalHostPath + "/Abbonamenti/CreazionePianoAbbonamento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objData),
        });

        const serverResponse = await sendData.json();
        console.log(serverResponse);

        dispatch(SetUltimoAbbonamentoCreato(serverResponse));

        const SessionePagamento = await fetchWithAuth(
            LocalHostPath + `/Abbonamenti/CreaSessionPagamento/${serverResponse.idAbbonamento}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        const ReturnedSessionID = await SessionePagamento.json();
        console.log(ReturnedSessionID);

        const stripe = await stripePromise;
        await stripe.redirectToCheckout({
            sessionId: ReturnedSessionID.id,
        });

        console.log(Response);
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};
