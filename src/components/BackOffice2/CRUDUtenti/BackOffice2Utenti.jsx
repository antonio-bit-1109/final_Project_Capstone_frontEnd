import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import DivMapUtenti from "./DivMapUtenti";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUtenti } from "../../../redux/actions/fetchUtenti";
// import AggiungiEsercizio from "../CRUDEsercizi/AggiungiEsercizio";
// import FormModificaEsercizio from "../CRUDEsercizi/FormModificaEsercizio";
import AggiungiUtente from "./AggiungiUtente";
import FormModificaUtente from "./FormModificaUtente";
import ModaleCancellaUtente from "../../BackOffice/ModaleCancellaUtente";
import ModaleCreaNuovoUtente from "./ModaleCreaNuovoUtente";
import { impostaWidthWindow, salvaDatiUtente } from "../../../redux/reducers/backOffice2Reducer";
import ModaleEditUtente from "./ModaleEditUtente";

const BackOffice2Utenti = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { WidthWindows } = useSelector((store) => store.BackOffice2);
    console.log(WidthWindows);

    useEffect(() => {
        dispatch(getUtenti());

        const handleResize = () => {
            dispatch(impostaWidthWindow(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);

        return () => {
            dispatch(
                salvaDatiUtente({
                    nomeUtente: "",
                    cognomeUtente: "",
                    peso: "",
                    altezza: "",
                    email: "",
                    easterEggFounded: false,
                    UtentePremium: false,
                    dataInizioAbbonamento: "",
                    dataFineAbbonamento: "",
                })
            );
            window.removeEventListener("resize", handleResize);
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
                    <DivMapUtenti />
                    {WidthWindows >= 992 && (
                        <Col>
                            <div className="CustomSticky_Position2">
                                <AggiungiUtente />
                                <div>
                                    <h3 className="text-light display-6">
                                        <p className="m-0">Modifica Utente Selezionato:</p>
                                    </h3>
                                </div>
                                <FormModificaUtente color={"text-light"} />
                            </div>
                        </Col>
                    )}
                </Row>
            </Container>

            <ModaleCancellaUtente />
            <ModaleCreaNuovoUtente text={"crea nuovo utente"} />
            <ModaleEditUtente />
        </div>
    );
};

export default BackOffice2Utenti;
