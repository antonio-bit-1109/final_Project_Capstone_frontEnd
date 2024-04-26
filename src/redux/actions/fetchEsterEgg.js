import { toast } from "react-toastify";
import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";
import { getDettagliUtente } from "./fetchUtenti";
import { setModalTreasure_False } from "../reducers/bonusReducer";

export const AbbonamentoBonus = () => async (dispatch) => {
    try {
        const response = await fetchWithAuth(LocalHostPath + "/EasterEgg/CreazioneAbbonamentoEasterEgg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        if (data) {
            const EsitoAbbRegalo = await fetchWithAuth(
                LocalHostPath + `/EasterEgg/AggiornaAbbonamentoUtente/${data.idAbbonamento}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (EsitoAbbRegalo.status === 500) {
                throw new Error(" qualcosa è andato storto.");
            }
            const risultato = await EsitoAbbRegalo.json();
            console.log(risultato);
            toast.success("Hai vinto 5 giorni di Abbonamento Bonus, Complimenti!", { autoClose: 3500 });
            setTimeout(() => {
                dispatch(getDettagliUtente());
                dispatch(setModalTreasure_False());
            }, 1500);
        }
    } catch (error) {
        console.error("Abbiamo un problema", error.message);
    }
};
