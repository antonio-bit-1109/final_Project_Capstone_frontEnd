import { Button, Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import "swiper/css/bundle";
// import TimerComponent from "./TimerComponent";
import SwiperCarousel from "./SwiperCarousel";
import BottoniFinePagina from "./BottoniFinePagina";
import CustomModale from "./CustomModale";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
// import { store } from "../../../redux/store/store";

const SvolgiAllenamentoPresoDallaLista = () => {
    // const navigate = useNavigate();
    // const dispatch = useDispatch();
    const { AllenamentoSceltogiaCreato } = useSelector((store) => store.allenamenti);
    console.log(AllenamentoSceltogiaCreato);
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    console.log("tuttidettagliutenteloggato", TuttiDettagliUtenteLoggato);

    const [isCustomModalVisible, setIscoCustomModalVisible] = useState(false);
    const [count, setCount] = useState(0);
    // const [calorieBruciate, setCalorieBruciate] = useState(0);

    useEffect(() => {
        if (isCustomModalVisible) {
            setTimeout(() => {
                setIscoCustomModalVisible(false);
            }, 2000);
        }
    }, [isCustomModalVisible]);

    const timerRef = useRef();
    const [minuti, setMinuti] = useState(null);
    const [secondi, setSecondi] = useState(0);
    const [Arrayrecuperi, setArrayRecuperi] = useState([]);
    const [timerIsRunning, setTimerIsRunning] = useState(false);

    // const consumoKcal_Sing_esercizio = (Met, kgUtente, altezzaUtente, durataEsercizio) => {
    //     console.log(Met, kgUtente, altezzaUtente, durataEsercizio);
    //     return Met * kgUtente * (0.000239 * altezzaUtente) * durataEsercizio;
    // };

    // const durataSIngoloEsercizio_sec = (reps, serie, recupero) => {
    //     console.log(reps, serie, recupero);
    //     return reps * 2 * serie + (recupero * serie - 1);
    // };

    useEffect(() => {
        if (AllenamentoSceltogiaCreato) {
            setMinuti(AllenamentoSceltogiaCreato.durataTotaleAllenamento);
            timerRef.current = AllenamentoSceltogiaCreato.durataTotaleAllenamento;
            let array = [];
            AllenamentoSceltogiaCreato.esercizi.map((es) => {
                array.push(es.recupero);
            });
            setArrayRecuperi(array);
        }
    }, [AllenamentoSceltogiaCreato]);

    useEffect(() => {
        if (timerIsRunning) {
            // gestisco lo scorrere e il blocco del tempo
            if (timerRef.current !== minuti) {
                setMinuti(minuti);
                setSecondi((prev) => prev);
            } else {
                setMinuti((prev) => prev - 1);
                setSecondi(59);
            }

            // nell interval insieme allo scorrere dle tempo calcolo anche il consumo calorico dell esercizio al secondo
            const interval = setInterval(() => {
                setSecondi((prevSecondi) => {
                    if (prevSecondi === 1) {
                        setMinuti((prevMinuti) => prevMinuti - 1);
                        return 60;
                    } else {
                        return prevSecondi - 1;
                    }
                });

                if (minuti === 0 && secondi === 0) {
                    clearInterval(interval);
                    toast.success(" Complimenti, Hai terminato l'allenamento!", { autoClose: 3000 });
                }

                // const caloriePerEsercizio = AllenamentoSceltogiaCreato.esercizi.map((esercizio) =>
                //     consumoKcal_Sing_esercizio(
                //         esercizio.met,
                //         TuttiDettagliUtenteLoggato.peso,
                //         TuttiDettagliUtenteLoggato.altezza,
                //         durataSIngoloEsercizio_sec(esercizio.ripetizioni, esercizio.serie, esercizio.recupero)
                //     )
                // );
                // // Somma tutte le calorie bruciate
                // let calorieTotaliAllenamento = 0;

                // for (let i = 0; i < caloriePerEsercizio.length; i++) {
                //     calorieTotaliAllenamento += caloriePerEsercizio[i];
                // }

                // Aggiorna lo stato delle calorie bruciate
                // setCalorieBruciate(Math.floor(calorieTotaliAllenamento));
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [Arrayrecuperi, timerIsRunning, minuti, secondi]);

    return (
        <div className="Bg-sfondo-dark altezza-sfondo position-relative">
            <CustomModale count={count} isCustomModalVisible={isCustomModalVisible} />
            <Container>
                {AllenamentoSceltogiaCreato && (
                    <>
                        <Row>
                            {/* <TimerComponent
                                setCount={setCount}
                                setIscoCustomModalVisible={setIscoCustomModalVisible}
                                AllenamentoSceltogiaCreato={AllenamentoSceltogiaCreato}
                            /> */}
                            <Col xs="6" sm="5" md="5" lg="4" xl="3">
                                <div className="d-flex flex-column py-3">
                                    {/* TIMER */}
                                    <div className="display-1 rounded rounded-5 my-4 p-3 shadow-lg bg-button">
                                        <span className="text-light d-flex justify-content-center">
                                            {minuti} : {secondi < 10 ? "0" + secondi : secondi}
                                        </span>
                                    </div>
                                    <div>
                                        <Button
                                            variant="warning"
                                            className="rounded-4 text-light fw-bold fs-3"
                                            onClick={() => {
                                                setTimerIsRunning(!timerIsRunning);
                                                setIscoCustomModalVisible(true);
                                                setCount((prev) => prev + 1);
                                            }}
                                        >
                                            {" "}
                                            {timerIsRunning ? "STOP" : "Sei Pronto?"}
                                        </Button>
                                    </div>
                                </div>
                            </Col>

                            <Col xs="12" sm="12" md="7" lg="8" xl="7">
                                <div className="d-flex flex-column py-3">
                                    {/* TIMER */}
                                    <div className="display-3 rounded rounded-5 my-4 p-3 shadow-lg bg-button">
                                        <span className="text-light d-flex justify-content-center">
                                            Kcal Bruciate : <span className="fw-bold ms-3 text-warning">0</span>
                                        </span>
                                    </div>
                                </div>
                            </Col>
                            <SwiperCarousel AllenamentoSceltogiaCreato={AllenamentoSceltogiaCreato} />
                        </Row>
                    </>
                )}

                <BottoniFinePagina AllenamentoSceltogiaCreato={AllenamentoSceltogiaCreato} />
            </Container>
        </div>
    );
};

export default SvolgiAllenamentoPresoDallaLista;
