import { LocalHostPath } from "../../functions/localHostPath";
import { fetchWithAuth } from "../../functions/interceptor";
import { setProdottiAcquistati, setProdottoAppenaCreato, setlistaProdotti } from "../reducers/prodottiReducer";

export const GetProdotti = () => async (dispatch) => {
    try {
        const response = await fetchWithAuth(LocalHostPath + "/Prodotto/list", {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response.ok) {
            const dataProdotti = await response.json();

            console.log(dataProdotti);

            dispatch(setlistaProdotti(dataProdotti));
            // dispatch(setListaUtenti(dataProfile));
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
    }
};

export const PostProdottoAcquistato = (objbody) => async () => {
    try {
        const response = await fetchWithAuth(LocalHostPath + "/Prodotto/CreaProdottoAcquistato", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ Prodotti: objbody }),
        });

        if (response.ok) {
            const Serverresponse = await response.json();
            console.log(Serverresponse);
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
    }
};

export const EmailConfermaAcquisto = (mailUtente, objBody) => async () => {
    try {
        const response = await fetchWithAuth(LocalHostPath + "/Email/sendConfermaAcquisto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ to: mailUtente, listaAcquisti: objBody }),
        });

        if (response.ok) {
            const Serverresponse = await response.json();
            console.log(Serverresponse);
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        // Puoi gestire gli errori qui, se necessario
        console.error("Errore nel fetch:", error.message);
    }
};

export const CreaNuovoProdotto = (pathUrl, data, formData) => async (dispatch) => {
    try {
        const sendData = await fetchWithAuth(pathUrl + "/Prodotto/CreateProdotto", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (sendData.ok) {
            const Idprodotto = await sendData.json();

            console.log(Idprodotto);

            const dataSend = await fetchWithAuth(pathUrl + `/Prodotto/AggiungiImmagine/${Idprodotto}`, {
                method: "POST",
                body: formData,
            });

            if (dataSend.ok) {
                const prodottoCreato = dataSend.json();

                dispatch(setProdottoAppenaCreato(prodottoCreato));
                dispatch(GetProdotti());
            }
        } else {
            throw new Error("Errore nel recupero dei risultati");
        }
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};

export const cancellaProdotto = (pathUrl, idProdotto) => async (dispatch) => {
    try {
        const cancellaProdotto = await fetchWithAuth(pathUrl + `/Prodotto/cancellaProdotto/${idProdotto}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (cancellaProdotto.ok) {
            dispatch(GetProdotti());
        }
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};

export const ShowStoricoAcquisti = (idUtente) => async (dispatch) => {
    try {
        const request = await fetchWithAuth(LocalHostPath + `/Carrello/storicoAcquisti/${idUtente}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const response = await request.json();

        if (response.data) {
            dispatch(setProdottiAcquistati(response.data));
        } else {
            throw new Error("Errore nel recupero degli acquisti utente ");
        }
    } catch (error) {
        console.error("Errore nel fetch:", error.message);
    }
};
