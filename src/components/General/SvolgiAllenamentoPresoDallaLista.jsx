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

const SvolgiAllenamentoPresoDallaLista = () => {
    const navigate = useNavigate();
    const { AllenamentoSceltogiaCreato } = useSelector((store) => store.allenamenti);
    console.log("AllenamentoSceltogiaCreato", AllenamentoSceltogiaCreato);
    const dispatch = useDispatch();

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

    return (
        <>
            <Container>
                {AllenamentoSceltogiaCreato && (
                    <Row>
                        <Col xxl="12">
                            <div className="d-flex justify-content-center">
                                <h1>{AllenamentoSceltogiaCreato.nomeAllenamento}</h1>
                            </div>
                            <div className="d-flex justify-content-around">
                                <p> Durata Totale Allenamento :{AllenamentoSceltogiaCreato.durataTotaleAllenamento}</p>
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
                )}

                <Row>
                    <Col>
                        <div>
                            <Button onClick={handleClick}> Termina e registra Allenamento completato </Button>
                        </div>
                        <div>
                            <Button onClick={() => navigate("/allenamentiDisponibili")}> Torna Indietro </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default SvolgiAllenamentoPresoDallaLista;
