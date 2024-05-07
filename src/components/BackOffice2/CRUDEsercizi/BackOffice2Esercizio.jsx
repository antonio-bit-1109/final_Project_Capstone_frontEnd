import { useEffect, useRef } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GetAllEsercizi } from "../../../redux/actions/fetchEsercizi";
import DivMapEsercizi from "./DivMapEsercizi";
import AggiungiEsercizio from "./AggiungiEsercizio";
import FormModificaEsercizio from "./FormModificaEsercizio";
import ModaleCreazioneNuovoEsercizio from "../../BackOffice/ModaleCreazioneNuovoEsercizio";
import ModaleDeleteEsercizio from "../../BackOffice/ModaleDeleteEsercizio";
import { impostaWidthWindow, salvaDatiEsercizio } from "../../../redux/reducers/backOffice2Reducer";
import ModaleEditEsercizio from "./ModaleEditEsercizio";

const BackOffice2Esercizio = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const RefWidthWindow = useRef();

    const { WidthWindows } = useSelector((store) => store.BackOffice2);
    console.log(WidthWindows);

    useEffect(() => {
        dispatch(GetAllEsercizi());

        RefWidthWindow.current = WidthWindows;

        const handleResize = () => {
            dispatch(impostaWidthWindow(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);

        return () => {
            dispatch(
                salvaDatiEsercizio({
                    nomeEsercizio: "",
                    descrizioneEsercizio: "",
                    DifficoltaEsercizio: "",
                    IsStrength: true,
                    TempoRecupero: "",
                    Ripetizioni: "",
                    Serie: "",
                    met: "",
                    ParteDelCorpo: "",
                })
            );
            window.removeEventListener("resize", handleResize);
            dispatch(salvaDatiEsercizio(null));
        };
    }, [dispatch]);

    return (
        <div className="Bg-sfondo-dark altezza-sfondo">
            <Container>
                <Row>
                    <Col xs="12">
                        {" "}
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <h1 className="text-light display-2 my-3 text-center"> BackOffice </h1>{" "}
                        </div>
                    </Col>

                    {/* BOTTONI SCELTA CATEGORIA */}
                    <Col xs="12">
                        <div className="d-flex gap-3 mb-3">
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice");
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Prodotti{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice/Esercizio");
                                }}
                                variant="warning "
                                className="rounded-4 text-light fw-bold"
                            >
                                {" "}
                                Esercizi{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice/Utenti");
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Utenti
                            </Button>
                        </div>
                    </Col>
                    {/* DIV CONTENETE UN MAP CON GLI ESERCIZI  */}
                    <DivMapEsercizi />
                    {/* FORM DI INVIO DATI  */}
                    {WidthWindows && WidthWindows > 992 && (
                        <Col>
                            <div className="CustomSticky_Position2">
                                <AggiungiEsercizio />
                                <div>
                                    <h3 className="text-light display-6">
                                        <p className="m-0">Modifica Esercizio Selezionato:</p>
                                    </h3>
                                </div>
                                <FormModificaEsercizio color={"text-light"} />
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>
            <ModaleCreazioneNuovoEsercizio />
            <ModaleDeleteEsercizio />
            <ModaleEditEsercizio />
        </div>
    );
};

export default BackOffice2Esercizio;
