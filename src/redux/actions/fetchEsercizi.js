import { LocalHostPath } from "../../functions/localHostPath";
import { fetchWithAuth } from "../../functions/interceptor";
import { setUltimoEsercizioCreato, setlistaEsercizi } from "../reducers/eserciziReducer";
import { toast } from "react-toastify";

export const GetEsercizi = (parteCorpo, difficolta, Isstrength) => async (dispatch) => {
    try {
        const response = await fetchWithAuth(
            LocalHostPath + `/Esercizi/list/${parteCorpo}/${difficolta}/${Isstrength}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.ok) {
            const dataEsercizi = await response.json();

            console.log(dataEsercizi);

            dispatch(setlistaEsercizi(dataEsercizi));
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
    }
};

export const CreateEsercizio = (objPost, formData) => async (dispatch) => {
    try {
        const response = await fetchWithAuth(LocalHostPath + `/Esercizi/CreateEsercizio`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(objPost),
        });

        if (response.ok) {
            const DataNewEsercizio = await response.json();

            dispatch(setUltimoEsercizioCreato(DataNewEsercizio.esercizioCreato));

            // eslint-disable-next-line no-unused-vars
            const response2 = await fetchWithAuth(
                LocalHostPath + `/Esercizi/AggiungiImmagine/${DataNewEsercizio.idEsercizio}`,
                {
                    method: "POST",
                    // no Json stringify quando invii un file formdata
                    body: formData,
                }
            );
            toast.success("Esercizio Creato con successo!", { autoClose: 2000, position: "top-center" });
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
    }
};

export const ModificaSerieEsercizio = (serie, idEsercizio) => async (dispatch) => {
    try {
        const request = await fetchWithAuth(LocalHostPath + `/Esercizi/cambiaSerie/${idEsercizio}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(serie),
        });

        const response = request.json();
        console.log(response);
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};
