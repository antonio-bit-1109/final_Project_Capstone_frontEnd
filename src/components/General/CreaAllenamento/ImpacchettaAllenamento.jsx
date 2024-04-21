import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PostAllenamento } from "../../../redux/actions/fetchAllenamento";
import { LocalHostPath } from "../../../functions/localHostPath";
import { toast } from "react-toastify";

const ImpacchettaAllenamento = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // arrivo a questa pagina con l'array contenente gli oggetti esercizio e il nome dell allenamento inserito dall'utente. presi tutti da redux.
    const { allenamentoPersonalizzatoUtente } = useSelector((store) => store.allenamenti);
    const { nomeAllenamentoCreato } = useSelector((store) => store.allenamenti);

    console.log("allenamentoPersonalizzatoUtente", allenamentoPersonalizzatoUtente);
    console.log("nomeAllenamentoCreato", nomeAllenamentoCreato);
    // creo uno stato locale con le proprietà che rispecchano l'oggetto da inviare al server
    const [objdaInviare, setObjdaInviare] = useState({
        NomeAllenamento: null,
        IdEsercizi: null,
        DurataTotaleAllenamento: null,
        SerieTotali: null,
        RipetizioniTotali: null,
    });

    // calcolo durata, serie e ripetizioni totali dell'allenamento
    useEffect(() => {
        if (allenamentoPersonalizzatoUtente && nomeAllenamentoCreato) {
            let oldArray = [];
            let durataTotAllen = 0;
            let serieTotAllen = 0;
            let ripetizioniTotAllen = 0;

            for (let i = 0; i < allenamentoPersonalizzatoUtente.length; i++) {
                let singoloEsercizioObj = allenamentoPersonalizzatoUtente[i];

                oldArray.push(singoloEsercizioObj.idEsercizio);

                durataTotAllen +=
                    singoloEsercizioObj.ripetizioni * 2 * singoloEsercizioObj.serie +
                    singoloEsercizioObj.tempoRecupero * singoloEsercizioObj.serie;

                serieTotAllen += singoloEsercizioObj.serie;
                ripetizioniTotAllen += singoloEsercizioObj.ripetizioni * singoloEsercizioObj.serie;
            }

            // setto lo stato locale con l'oggetto da inviare al server
            setObjdaInviare({
                NomeAllenamento: nomeAllenamentoCreato,
                IdEsercizi: oldArray,
                DurataTotaleAllenamento: durataTotAllen,
                SerieTotali: serieTotAllen,
                RipetizioniTotali: ripetizioniTotAllen,
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // quando lo stato locale objdaInviare viene aggiornato, invio l'oggetto al server
    useEffect(() => {
        //controllare che ogni proprietà di un oggetto non sia null prima di fare la fetch e inviare i dati al server
        if (Object.values(objdaInviare).every((prop) => prop !== null)) {
            dispatch(PostAllenamento(LocalHostPath + "/Allenamento/AggiungiAllenamento", objdaInviare));
            toast.success("Allenamento Creato con Successo!", {
                autoClose: 3500,
                position: "top-center",
            });
            navigate("/");
        }
        return;
    }, [objdaInviare, dispatch, navigate]);

    return <></>;
};

export default ImpacchettaAllenamento;
