import { LocalHostPath } from "../../functions/localHostPath";
import { fetchWithAuth } from "../../functions/interceptor";
import { setListaTuttiEsercizi, setUltimoEsercizioCreato, setlistaEsercizi } from "../reducers/eserciziReducer";
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

export const GetAllEsercizi = () => async (dispatch) => {
    try {
        const request = await fetchWithAuth(LocalHostPath + "/Esercizi/ListAllExercise", {
            method: "GET",
        });

        const response = await request.json();
        console.log(response);
        dispatch(setListaTuttiEsercizi(response));
    } catch (error) {
        console.error("abbiamo un problema" + error);
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
            dispatch(GetAllEsercizi());
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
    }
};

// export const ModificaSerieEsercizio = (serie, idEsercizio) => async (dispatch) => {
//     try {
//         const request = await fetchWithAuth(LocalHostPath + `/Esercizi/cambiaSerie/${idEsercizio}`, {
//             method: "POST",
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify(serie),
//         });

//         const response = request.json();
//         console.log(response);
//     } catch (error) {
//         console.error("Errore nel fetch:", error.message);
//     }
// };

export const deleteEsercizio = (idEsercizio) => async (dispatch) => {
    try {
        const request = await fetchWithAuth(LocalHostPath + `/Esercizi/cancellaEsercizio/${idEsercizio}`, {
            method: "DELETE",
        });

        if (request.ok) {
            toast.success("cancellazione avvenuta con successo", { autoClose: 1200 });
            dispatch(GetAllEsercizi());
        } else {
            throw new Error("errore", request.status);
        }
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};

export const ModificaEsercizioFetch = (idEsercizio, stateEsercizio, formData) => async (dispatch) => {
    try {
        const response = await fetchWithAuth(LocalHostPath + `/Esercizi/modificaEsercizio/${idEsercizio}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(stateEsercizio),
        });

        if (response.status === 500) {
            throw new Error("Huston abbiamo un problema", response.status);
        }

        if (response.ok) {
            const idEsercizioModificato = await response.json();
            console.log(idEsercizioModificato);

            const modificaImmagine = await fetchWithAuth(
                LocalHostPath + `/Esercizi/modificaImmagine/${idEsercizioModificato}`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            if (modificaImmagine.status === 500) {
                throw new Error("esercizio non trovato nel db.");
            }

            const esitoPositivo = await modificaImmagine.json();
            console.log(esitoPositivo.message);
            dispatch(GetAllEsercizi());
        }
    } catch (error) {
        console.error(error);
    }
};
