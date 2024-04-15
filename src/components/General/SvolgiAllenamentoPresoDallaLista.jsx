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
import { useEffect, useState, useRef } from "react";

const SvolgiAllenamentoPresoDallaLista = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const timerRef = useRef();
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
        timerRef.current = AllenamentoSceltogiaCreato.durataTotaleAllenamento;
        let array = [];
        AllenamentoSceltogiaCreato.esercizi.map((es) => {
            array.push(es.recupero);
        });
        setArrayRecuperi(array);
    }, []);

    useEffect(() => {
        if (timerIsRunning) {
            if (timerRef.current !== minuti) {
                setMinuti(minuti);
                setSecondi((prev) => prev);
            } else {
                setMinuti((prev) => prev - 1);
                setSecondi(59);
            }

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
            }, 1000);

            return () => {
                clearInterval(interval);
            };
        }
    }, [Arrayrecuperi, timerIsRunning]);

    return (
        <div className="Bg-sfondo altezza-sfondo">
            <Container>
                {AllenamentoSceltogiaCreato && (
                    <>
                        <Row>
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
                                                // stopTimer();
                                                setTimerIsRunning(!timerIsRunning);
                                            }}
                                        >
                                            {" "}
                                            {timerIsRunning ? "STOP" : "Sei Pronto?"}
                                        </Button>
                                    </div>
                                </div>
                            </Col>
                            <div className="blurStyle rounded-5">
                                <Col xs="12" sm="12">
                                    <span className=" text-light">
                                        <div className="h-100 my-sm-4">
                                            <div className="d-flex justify-content-center h-50 align-items-center">
                                                <h1 className="display-3 fw-bold">
                                                    {AllenamentoSceltogiaCreato.nomeAllenamento
                                                        .charAt(0)
                                                        .toUpperCase() +
                                                        AllenamentoSceltogiaCreato.nomeAllenamento.slice(1)}
                                                </h1>
                                            </div>
                                            <div className="d-flex justify-content-around">
                                                <div className="d-flex flex-column align-items-center">
                                                    {" "}
                                                    <span className="fs-3">Durata Allenamento:</span>
                                                    <span className="fs-1">
                                                        {" "}
                                                        {AllenamentoSceltogiaCreato.durataTotaleAllenamento} &apos;
                                                    </span>
                                                </div>
                                                <div className="d-flex flex-column align-items-center">
                                                    {" "}
                                                    <span className="fs-3">Serie Totali:</span>
                                                    <span className="fs-1">
                                                        {" "}
                                                        {AllenamentoSceltogiaCreato.serieTotali}
                                                    </span>
                                                </div>
                                                <div className="d-flex flex-column align-items-center">
                                                    {" "}
                                                    <span className="fs-3">Ripetizioni Totali:</span>
                                                    <span className="fs-1">
                                                        {" "}
                                                        {AllenamentoSceltogiaCreato.ripetizioniTotali}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                </Col>
                                <Swiper draggable="true">
                                    {AllenamentoSceltogiaCreato.esercizi.map((esercizio, i) => (
                                        <SwiperSlide key={`ciao-${i}`}>
                                            <div className="my-2 ">
                                                <Col>
                                                    <div className="d-flex">
                                                        <div>
                                                            <img
                                                                style={{ width: "30vw" }}
                                                                src={`${LocalHostPath}/img-esercizi/${esercizio.immagineEsercizio}`}
                                                                alt="esercizio"
                                                            />
                                                        </div>

                                                        <div className="display-2 text-light fw-semibold m-auto">
                                                            <p>{esercizio.nomeEsercizio}</p>
                                                            <p>
                                                                {esercizio.serie} x {esercizio.ripetizioni}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        </Row>
                    </>
                )}

                <Row>
                    <Col>
                        <div className="d-flex gap-2 my-4">
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
        </div>
    );
};

export default SvolgiAllenamentoPresoDallaLista;
