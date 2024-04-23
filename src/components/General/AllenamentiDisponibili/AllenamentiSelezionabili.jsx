/* eslint-disable react/prop-types */
import { Button, Card, Col, Row } from "react-bootstrap";
import { Trash3Fill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAllenamentoSceltogiaCreato } from "../../../redux/reducers/allenamentiReducer";

const AllenamentiSelezionabili = ({
    // eslint-disable-next-line react/prop-types
    handleShow,
    handleShowEsercizi,
    setAllenamDacancellare,
    setDettagliAllenamento,
}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { listaAllenamentiDisponibili } = useSelector((store) => store.allenamenti);

    const mediaDifficolta = (difficoltaAllenamento) => {
        switch (difficoltaAllenamento) {
            case 1:
                return "Facile";
            case 2:
                return "Media";
            case 3:
                return "Difficile";
            default:
                return "Non Valutabile";
        }
    };

    return (
        <>
            {!listaAllenamentiDisponibili || listaAllenamentiDisponibili.length === 0 ? (
                <Row>
                    <Col>
                        <div>
                            <h2 className="display-3 text-light">non sono disponibili allenamenti da visualizzare.</h2>
                        </div>
                    </Col>
                </Row>
            ) : (
                <Row className="justify-content-center ">
                    {listaAllenamentiDisponibili &&
                        listaAllenamentiDisponibili.map((allenamento, index) => (
                            <Col xs="12" sm="10" md="7" lg="6" xxl="5" key={`index-n-${index}`}>
                                <Card className="my-3 rounded-5 scalaAnimazione shadow-lg effettoVetro text-light border border-2">
                                    <Card.Body>
                                        <div className="d-xl-flex justify-content-xl-center gap-4">
                                            {" "}
                                            <div className="d-xl-flex flex-xl-column gap-3">
                                                <Card.Title className="display-3 fw-normal">
                                                    {allenamento.nomeAllenamento}
                                                </Card.Title>
                                                <div className="d-flex gap-2">
                                                    <Button
                                                        variant="light"
                                                        className="rounded-4 text-warning border-warning fw-bold"
                                                        onClick={() => {
                                                            handleShowEsercizi();
                                                            setDettagliAllenamento(allenamento);
                                                        }}
                                                    >
                                                        {" "}
                                                        Dettagli Allenamento
                                                    </Button>
                                                    <Button
                                                        variant="warning text-light"
                                                        className="rounded-4 text-warning border-warning fw-bold"
                                                        onClick={() => {
                                                            dispatch(setAllenamentoSceltogiaCreato(allenamento));
                                                            navigate("/svolgiAllenamentoPresoDallaLista");
                                                        }}
                                                    >
                                                        {" "}
                                                        Svolgi Allenamento
                                                    </Button>
                                                    {TuttiDettagliUtenteLoggato &&
                                                    TuttiDettagliUtenteLoggato.ruolo === "admin" ? (
                                                        <Button
                                                            variant="light"
                                                            className="rounded-4 text-warning border-warning fw-bold"
                                                            onClick={() => {
                                                                // handleDelete(allenamento.idAllenamento);
                                                                handleShow();
                                                                setAllenamDacancellare(allenamento.idAllenamento);
                                                            }}
                                                        >
                                                            {" "}
                                                            <Trash3Fill />
                                                        </Button>
                                                    ) : null}
                                                </div>
                                                <div className="d-flex flex-column justify-content-center my-2">
                                                    Difficoltà:{" "}
                                                    <span
                                                        className="fw-semibold fs-5"
                                                        style={{
                                                            color:
                                                                mediaDifficolta(allenamento.dIfficoltaMedia) ===
                                                                "Facile"
                                                                    ? "green"
                                                                    : mediaDifficolta(allenamento.dIfficoltaMedia) ===
                                                                      "Media"
                                                                    ? "orange"
                                                                    : mediaDifficolta(allenamento.dIfficoltaMedia) ===
                                                                      "Difficile"
                                                                    ? "red"
                                                                    : "black",
                                                        }}
                                                    >
                                                        {mediaDifficolta(allenamento.dIfficoltaMedia)}
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="my-3">
                                                    <div className="d-xl-flex gap-3">
                                                        <Card.Text>
                                                            {" "}
                                                            <span className="fw-semibold fs-4">
                                                                Ripetizioni Totali:
                                                            </span>
                                                            <span className="fw-semibold fs-3 ms-2">
                                                                {allenamento.ripetizioniTotali}
                                                            </span>
                                                        </Card.Text>
                                                    </div>
                                                    <div>
                                                        {" "}
                                                        <Card.Text>
                                                            {" "}
                                                            <span className="fw-semibold fs-4">Serie Totali:</span>
                                                            <span className="fw-semibold fs-3 ms-2">
                                                                {allenamento.serieTotali}
                                                            </span>
                                                        </Card.Text>
                                                    </div>
                                                    <div>
                                                        <Card.Text>
                                                            {" "}
                                                            <span className="fw-semibold fs-4">Durata Totale:</span>
                                                            <span className="fw-semibold fs-3 ms-2">
                                                                {allenamento.durataTotaleAllenamento}&apos;
                                                            </span>
                                                        </Card.Text>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            )}
        </>
    );
};

export default AllenamentiSelezionabili;
