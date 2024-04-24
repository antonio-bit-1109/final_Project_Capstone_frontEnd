/* eslint-disable react/prop-types */
import { Col, Row } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { LocalHostPath } from "../../../functions/localHostPath";
import { useSelector } from "react-redux";

const SwiperCarousel = () => {
    const { AllenamentoSceltogiaCreato } = useSelector((store) => store.allenamenti);

    return (
        <div className="effettoVetro border border-2 rounded-5 p-3">
            <Col xs="12" sm="12">
                <span className=" text-light">
                    <div className="h-100 my-sm-4">
                        <div className="d-flex justify-content-center h-50 align-items-center">
                            <h1 className="display-3 fw-bold">
                                {AllenamentoSceltogiaCreato.nomeAllenamento.charAt(0).toUpperCase() +
                                    AllenamentoSceltogiaCreato.nomeAllenamento.slice(1)}
                            </h1>
                        </div>
                        <div className="d-flex gap-3 justify-content-around">
                            <div className="d-block d-md-flex flex-column align-items-center">
                                {" "}
                                <span className="fs-3">Durata Allenamento:</span>
                                <span className="fs-1">
                                    {" "}
                                    ~ {AllenamentoSceltogiaCreato.durataTotaleAllenamento} &apos;
                                </span>
                            </div>
                            <div className="d-block d-md-flex flex-column align-items-center">
                                {" "}
                                <span className="fs-3">Serie Totali:</span>
                                <span className="fs-1"> {AllenamentoSceltogiaCreato.serieTotali}</span>
                            </div>
                            <div className="d-block d-md-flex flex-column align-items-center">
                                {" "}
                                <span className="fs-3">Ripetizioni Totali:</span>
                                <span className="fs-1"> {AllenamentoSceltogiaCreato.ripetizioniTotali}</span>
                            </div>
                        </div>
                    </div>
                </span>
            </Col>
            <div>
                <Swiper draggable="true">
                    {AllenamentoSceltogiaCreato.esercizi.map((esercizio, i) => (
                        <SwiperSlide key={`ciao-${i}`}>
                            <div className="my-2 ">
                                <Row className="d-lg-flex justify-content-lg-center align-items-lg-center ">
                                    <Col xs="12" lg="6">
                                        <div className="d-flex justify-content-center align-items-center my-3 p-3">
                                            <img
                                                style={{ maxHeight: "350px", maxWidth: "100%" }}
                                                src={`${LocalHostPath}/img-esercizi/${esercizio.immagineEsercizio}`}
                                                alt="esercizio"
                                            />
                                        </div>
                                    </Col>
                                    <Col xs="12" lg="6">
                                        <div className="display-3 text-light fw-semibold d-flex flex-column align-items-center w-100">
                                            <p className="text-center">{esercizio.nomeEsercizio}</p>
                                            <p>
                                                {esercizio.serie} x {esercizio.ripetizioni}
                                            </p>
                                        </div>
                                    </Col>
                                </Row>
                            </div>{" "}
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
};

export default SwiperCarousel;
