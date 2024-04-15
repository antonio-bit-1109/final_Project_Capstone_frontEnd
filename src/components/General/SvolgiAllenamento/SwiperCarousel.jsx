/* eslint-disable react/prop-types */
import { Col } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { LocalHostPath } from "../../../functions/localHostPath";

const SwiperCarousel = ({ AllenamentoSceltogiaCreato }) => {
    return (
        <div className="blurStyle rounded-5">
            <Col xs="12" sm="12">
                <span className=" text-light">
                    <div className="h-100 my-sm-4">
                        <div className="d-flex justify-content-center h-50 align-items-center">
                            <h1 className="display-3 fw-bold">
                                {AllenamentoSceltogiaCreato.nomeAllenamento.charAt(0).toUpperCase() +
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
                                <span className="fs-1"> {AllenamentoSceltogiaCreato.serieTotali}</span>
                            </div>
                            <div className="d-flex flex-column align-items-center">
                                {" "}
                                <span className="fs-3">Ripetizioni Totali:</span>
                                <span className="fs-1"> {AllenamentoSceltogiaCreato.ripetizioniTotali}</span>
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
    );
};

export default SwiperCarousel;
