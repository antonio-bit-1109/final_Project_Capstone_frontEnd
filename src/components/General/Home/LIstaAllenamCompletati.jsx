import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, FiletypePdf } from "react-bootstrap-icons";
import { fetchCreaPDF } from "../../../redux/actions/fetchPDF";
import { useEffect } from "react";
import { getAllenamentiCompletati } from "../../../redux/actions/fetchAllenamentoCompletato";
import { getDettagliUtente } from "../../../redux/actions/fetchUtenti";

const LIstaAllenamCompletati = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { AllenamentiCompletatiUtente } = useSelector((store) => store.allenamentiCompletati);
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    console.log(TuttiDettagliUtenteLoggato);
    console.log(AllenamentiCompletatiUtente);

    useEffect(() => {
        dispatch(getDettagliUtente());
    }, [dispatch]);

    useEffect(() => {
        if (TuttiDettagliUtenteLoggato) {
            dispatch(
                getAllenamentiCompletati(
                    TuttiDettagliUtenteLoggato.idUtente,
                    "/AllenamentiCompletati/CompletedWorkoutsUtente/"
                )
            );
        }
    }, [dispatch, TuttiDettagliUtenteLoggato]);

    const generatePDF = (allCompletato) => {
        dispatch(fetchCreaPDF(allCompletato));
    };

    const TraduciDifficolta = (number) => {
        switch (number) {
            case 1:
                return "Facile";
            case 2:
                return "Medio";
            case 3:
                return "Difficile";
            default:
                return "N/A";
        }
    };

    return (
        <div className="Bg-sfondo-dark min-vh-100">
            <Container>
                <Row>
                    <Col>
                        <div className="my-1">
                            <Button
                                onClick={() => navigate("/")}
                                variant="transparent"
                                className="rounded-4 text-light fw-bolder"
                            >
                                {" "}
                                <ArrowLeft size={100} />
                            </Button>
                        </div>
                    </Col>
                </Row>

                {AllenamentiCompletatiUtente && AllenamentiCompletatiUtente.length === 0 && (
                    <Row>
                        <Col>
                            <div className="my-3">
                                {" "}
                                <h2 className="display-3 text-light">Non hai ancora completato nessun allenamento.</h2>
                            </div>
                        </Col>
                    </Row>
                )}

                <Row>
                    {AllenamentiCompletatiUtente &&
                        AllenamentiCompletatiUtente.map((allenamentoComplete, i) => (
                            <Col key={`ciao-${i}`} xs="12" sm="12" md="12" lg="6">
                                <Card className="rounded rounded-5 my-4 p-5 position-relative effettoVetro border border-2 position-relative">
                                    {/* TIMBRO */}
                                    <div className="box positionStamp">
                                        <span
                                            style={{
                                                color:
                                                    allenamentoComplete.allenamento.difficoltaMediaAllenamento === 1
                                                        ? "green"
                                                        : allenamentoComplete.allenamento.difficoltaMediaAllenamento ===
                                                          2
                                                        ? "#FFCA2C"
                                                        : "red",
                                                border:
                                                    allenamentoComplete.allenamento.difficoltaMediaAllenamento === 1
                                                        ? "  0.5rem double green"
                                                        : allenamentoComplete.allenamento.difficoltaMediaAllenamento ===
                                                          2
                                                        ? " 0.5rem double #FFCA2C"
                                                        : " 0.5rem double red",
                                            }}
                                            className="stamp is-nope"
                                        >
                                            {TraduciDifficolta(
                                                allenamentoComplete.allenamento.difficoltaMediaAllenamento
                                            )}
                                        </span>
                                    </div>
                                    {/* TIMBRO */}
                                    <span className="text-light">
                                        Completato il: <br />{" "}
                                    </span>
                                    <div className="my-1 text-light">
                                        {" "}
                                        <span className="fs-5">
                                            {new Date(allenamentoComplete.dataEOraComplete).toLocaleDateString("it-IT")}{" "}
                                        </span>{" "}
                                        -{" "}
                                        <span className="fs-5">
                                            {new Date(allenamentoComplete.dataEOraComplete).toLocaleTimeString("it-IT")}
                                        </span>
                                    </div>
                                    <h2 className="display-5 fw-bold text-light">
                                        {allenamentoComplete.allenamento.nomeAllenamento.toUpperCase()}
                                    </h2>
                                    <div className="mb-4 text-light ">
                                        <p className="m-0 ">
                                            <span className="fs-3">Durata Totale :</span>{" "}
                                            <span className="fs-3 fst-italic ms-2 ">
                                                {allenamentoComplete.allenamento.durataTotaleAllenamento} &apos;
                                            </span>
                                        </p>
                                        <p className="m-0 ">
                                            {" "}
                                            <span className="fs-3 ">Serie Totali :</span>{" "}
                                            <span className="fs-3 fst-italic ms-2">
                                                {allenamentoComplete.allenamento.totaleSerie}
                                            </span>
                                        </p>
                                        <p className="m-0">
                                            {" "}
                                            <span className="fs-3 ">Ripetizioni Totali :</span>{" "}
                                            <span className="fs-3 fst-italic ms-2">
                                                {" "}
                                                {allenamentoComplete.allenamento.totaleRipetizioni}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="text-light">
                                        {allenamentoComplete.allenamento.eserciziInAllenamento.map((es, i) => (
                                            <div key={`k-${i}`}>
                                                <p>
                                                    &bull;{" "}
                                                    <span className="fs-5 fw-semibold">
                                                        {" "}
                                                        {es.esercizio.nomeEsercizio}{" "}
                                                    </span>{" "}
                                                    <span className="mx-2">{es.esercizio.parteDelCorpo} </span>
                                                    <span className="fs-5 fw-semibold fst-italic">
                                                        {es.esercizio.serie} x {es.esercizio.ripetizioni}
                                                    </span>
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                    <Button
                                        onClick={() => generatePDF(allenamentoComplete)}
                                        variant="transparent customPositionPdfIcon"
                                    >
                                        <FiletypePdf size={50} className=" text-light" />
                                    </Button>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    );
};

export default LIstaAllenamCompletati;
