import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { PostAllenamentoConcluso } from "../../redux/actions/fetchAllenamento";
import { LocalHostPath } from "../../functions/localHostPath";
import { useNavigate } from "react-router-dom";
import { setAllenamentoSceltogiaCreato } from "../../redux/reducers/allenamentiReducer";
// Import Swiper React components
// import { Navigation, Pagination, Scrollbar, A11y, Autoplay, EffectCoverflow, EffectFade } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const SvolgiAllenamentoPresoDallaLista = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { AllenamentoSceltogiaCreato } = useSelector((store) => store.allenamenti);
    console.log(AllenamentoSceltogiaCreato);
    const [minuti, setMinuti] = useState(null);
    const [secondi, setSecondi] = useState(0);
    const [Arrayrecuperi, setArrayRecuperi] = useState([]);
    const [timerIsRunning, setTimerIsRunning] = useState(false);

    const handleClick = () => {
        dispatch(
            PostAllenamentoConcluso(LocalHostPath + "/Allenamento/AllenamentoCompletato", AllenamentoSceltogiaCreato)
        );
        navigate("/");
        toast.success(" Complimenti, Hai terminato l'allenamento!", {
            autoClose: 2000,
        });
        dispatch(setAllenamentoSceltogiaCreato(null));
    };

    useEffect(() => {
        setMinuti(AllenamentoSceltogiaCreato.durataTotaleAllenamento);
        let array = [];
        AllenamentoSceltogiaCreato.esercizi.map((es) => {
            array.push(es.recupero);
        });
        setArrayRecuperi(array);
    }, [timerIsRunning]);

    useEffect(() => {
        if (timerIsRunning) {
            setMinuti((prev) => prev - 1);
            setSecondi(59);

            const timer = setInterval(() => {
                setSecondi((prevSecondi) => {
                    if (prevSecondi === 1) {
                        setMinuti((prevMinuti) => prevMinuti - 1);
                        return 60;
                    } else {
                        return prevSecondi - 1;
                    }
                });

                if (minuti === 0 && secondi === 0) {
                    clearInterval(timer);
                    toast.success(" Complimenti, Hai terminato l'allenamento!", { autoClose: 3000 });
                }
            }, 1000);
        }
    }, [Arrayrecuperi]);

    return (
        <>
            <Container>
                {AllenamentoSceltogiaCreato && (
                    <>
                        <Row>
                            <Col xs="12" sm="12" md="10" lg="6" xl="5">
                                {/* TIMER */}
                                <div className="display-1">
                                    {minuti} : {secondi === 0 ? secondi + "0" : secondi}
                                </div>
                                <div>
                                    <Button
                                        variant="warning "
                                        className="rounded-4 text-light fw-bold"
                                        onClick={() => {
                                            setTimerIsRunning(!timerIsRunning);
                                        }}
                                    >
                                        {" "}
                                        {timerIsRunning ? "Let's Workout!" : "Sei Pronto?"}
                                    </Button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className="d-flex justify-content-center">
                                    <h1>{AllenamentoSceltogiaCreato.nomeAllenamento}</h1>
                                </div>
                                <div className="d-flex justify-content-around">
                                    <p>
                                        {" "}
                                        Durata Totale Allenamento :{AllenamentoSceltogiaCreato.durataTotaleAllenamento}
                                    </p>
                                    <p> Serie Totali: {AllenamentoSceltogiaCreato.serieTotali}</p>
                                    <p> Ripetizioni Totali:{AllenamentoSceltogiaCreato.ripetizioniTotali}</p>
                                </div>
                            </Col>
                            <Swiper draggable="true">
                                {AllenamentoSceltogiaCreato.esercizi.map((esercizio, i) => (
                                    <SwiperSlide key={`ciao-${i}`}>
                                        <Row>
                                            <Col xl="9">
                                                <div>
                                                    <img
                                                        style={{ width: "100%" }}
                                                        src={`${LocalHostPath}/img-esercizi/${esercizio.immagineEsercizio}`}
                                                        alt="esercizio"
                                                    />
                                                </div>
                                            </Col>
                                            <Col xl="3">
                                                <div className="d-flex flex-column justify-content-center align-items-center h-100">
                                                    <p>{esercizio.nomeEsercizio}</p>
                                                    <p>{esercizio.serie}</p>
                                                    <p>{esercizio.ripetizioni}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </Row>
                    </>
                )}

                <Row>
                    <Col>
                        <div className="d-flex gap-2">
                            <Button variant="warning " className="rounded-4 text-light fw-bold" onClick={handleClick}>
                                {" "}
                                Termina e registra Allenamento completato{" "}
                            </Button>

                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={() => navigate("/allenamentiDisponibili")}
                            >
                                {" "}
                                Torna Indietro{" "}
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SvolgiAllenamentoPresoDallaLista;
