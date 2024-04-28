/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useSelector } from "react-redux";
// import { InfoCircleFill } from "react-bootstrap-icons";

const KcalBruciate = ({ timerIsRunning, kcalBurnSec, setKcalBurnSec }) => {
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { AllenamentoSceltogiaCreato } = useSelector((store) => store.allenamenti);
    // const [infoIsVisible, setInfoIsVisible] = useState(false);

    console.log(TuttiDettagliUtenteLoggato);
    console.log(AllenamentoSceltogiaCreato);

    const KcalBurnSecEsercizio = () => {
        for (let i = 0; i < AllenamentoSceltogiaCreato.esercizi.length; i++) {
            let singoloEsercizio = AllenamentoSceltogiaCreato.esercizi[i];

            let sforzo = singoloEsercizio.met;
            let durataTotEsercizioSingolo =
                singoloEsercizio.serie * singoloEsercizio.ripetizioni * 3 +
                singoloEsercizio.serie * singoloEsercizio.recupero;

            let KcalBurnEsercizio = (sforzo * TuttiDettagliUtenteLoggato.peso * durataTotEsercizioSingolo) / 3600; // i met vengono calcolati in kcal/kg/h se voglio il valore in secondi divido per 3600 (n sec in 1h)

            let KcalBurnEsercizioSec = KcalBurnEsercizio / durataTotEsercizioSingolo;
            let kcalBurnNumber = parseFloat(KcalBurnEsercizioSec.toFixed(2));
            setKcalBurnSec((prev) => (prev += kcalBurnNumber));
        }
    };

    useEffect(() => {
        if (timerIsRunning) {
            const interval = setInterval(() => {
                KcalBurnSecEsercizio();
            }, 2000);

            return () => clearInterval(interval);
        }
    }, [timerIsRunning]);

    return (
        <>
            <Col xs="12" sm="12" md="8" lg="8" xl="6">
                <div className="d-flex flex-column py-3 position-relative">
                    {/* timer kcal Bruciate */}

                    <div className="display-3 rounded rounded-5 my-4 p-3 shadow-lg bg-button">
                        <span className="text-light d-flex justify-content-center">
                            Kcal Bruciate/sec :{" "}
                            <span className="fw-bold ms-3 text-warning">{parseFloat(kcalBurnSec.toFixed(2))}</span>
                        </span>
                    </div>
                </div>
            </Col>
        </>
    );
};

export default KcalBruciate;
