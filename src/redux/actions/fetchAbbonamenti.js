import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";
import { loadStripe } from "@stripe/stripe-js";
import { toast } from "react-toastify";

const stripePromise = loadStripe(
    "pk_test_51OvOuXF8RKd4FcyTpcXChaAdtZ1fn5O7yY9BDTcEQcY5tlHXiYyc96EQDtnvrJNGTX3EArS1zMT0U03sL5VJSZGf00MjrfcJkf"
);

export const CreaAbbonamento = (objData) => async () => {
    try {
        const sendData = await fetchWithAuth(LocalHostPath + "/Abbonamenti/CreazionePianoAbbonamento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objData),
        });

        const serverResponse = await sendData.json();

        if (serverResponse.idAbbonamento) {
            console.log(serverResponse.idAbbonamento);

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
                sessionId: ReturnedSessionID.sessionId,
            });
        }

        console.log(serverResponse);
        toast.warning(serverResponse.message, { autoClose: 3000 });

        // console.log(Response);
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};

export const annullaAbbonamento = () => async (dispatch) => {
    const callAction = await fetchWithAuth(LocalHostPath + "/Abbonamenti/AnnullaAbbonamento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const serverResponse = await callAction.json();

    console.log(serverResponse);

    if (serverResponse.message === "Abbonamento Annullato con Successo.") {
        toast.success(serverResponse.message, { autoClose: 3000 });
    }

    if (serverResponse.title === "Bad Request") {
        toast.error("Errore nella cancellazione dell'abbonamento, contattare l' ADMIN.", { autoClose: 3000 });
    }

    if (serverResponse.message === "Non sono presenti Abbonamenti attivi.") {
        toast.info(serverResponse.message, { autoClose: 3000 });
    }
};
