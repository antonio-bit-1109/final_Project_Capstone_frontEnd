import { fetchWithAuth } from "../../functions/interceptor";
import { LocalHostPath } from "../../functions/localHostPath";

export const fetchCreaPDF = (allenamento) => async (dispatch) => {
    try {
        const sendData = await fetchWithAuth(LocalHostPath + "/PDF/generatePDF", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(allenamento),
        });

        if (sendData.ok) {
            const blob = await sendData.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", `allenamentoCompletato-${allenamento.allenamento.nomeAllenamento}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } else {
            throw new Error("Errore nel creare il PDF");
        }
    } catch (error) {
        console.log(error);
    }
};
