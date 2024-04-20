import { useEffect, useState } from "react";
import { CancellaAllenamento, GetListaAllenamenti } from "../../redux/actions/fetchAllenamento";
import { LocalHostPath } from "../../functions/localHostPath";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Modal, Row } from "react-bootstrap";
import { setAllenamentoSceltogiaCreato } from "../../redux/reducers/allenamentiReducer";
import { useNavigate } from "react-router-dom";
import { Trash3Fill } from "react-bootstrap-icons";

const AllenamentiDisponibili = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { listaAllenamentiDisponibili } = useSelector((store) => store.allenamenti);

    const [show, setShow] = useState(false);
    const [showEsercizi, setShowEsercizi] = useState(false);
    const [AllenamDacancellare, setAllenamDacancellare] = useState(null);
    const [DettagliAllenamento, setDettagliAllenamento] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEsercizi = () => setShowEsercizi(false);
    const handleShowEsercizi = () => setShowEsercizi(true);

    useEffect(() => {
        dispatch(GetListaAllenamenti(LocalHostPath + "/Allenamento/ListaAllenamenti"));
    }, [dispatch]);

    const handleDelete = (id) => {
        // cancella allenamento a partire dall'id
        dispatch(CancellaAllenamento(LocalHostPath + `/Allenamento/CancellaAllenamento/${id}`)).then(() => {
            // Aggiorna la lista degli allenamenti dopo aver cancellato un allenamento
            dispatch(GetListaAllenamenti(LocalHostPath + "/Allenamento/ListaAllenamenti"));
        });
    };

    const mediaDifficolta = (listaEsercizi) => {
        let difficoltamedia = 0;
        for (let i = 0; i < listaEsercizi.length; i++) {
            let difficoltaSingoloEsercizio = listaEsercizi[i].difficolta;
            difficoltamedia += difficoltaSingoloEsercizio;
        }

        let result = difficoltamedia / listaEsercizi.length;
        switch (Math.floor(result)) {
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
        <div className="Bg-sfondo-dark min-vh-100">
            <Container>
                {!listaAllenamentiDisponibili || listaAllenamentiDisponibili.length === 0 ? (
                    <Row>
                        <Col>
                            <div>
                                <h2 className="display-3 text-light">
                                    non sono disponibili allenamenti da visualizzare
                                </h2>
                            </div>
                        </Col>
                    </Row>
                ) : (
                    <Row className="justify-content-center ">
                        {listaAllenamentiDisponibili.map((allenamento, index) => (
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
                                                                mediaDifficolta(allenamento.esercizi) === "Facile"
                                                                    ? "green"
                                                                    : mediaDifficolta(allenamento.esercizi) === "Media"
                                                                    ? "orange"
                                                                    : mediaDifficolta(allenamento.esercizi) ===
                                                                      "Difficile"
                                                                    ? "red"
                                                                    : "black",
                                                        }}
                                                    >
                                                        {mediaDifficolta(allenamento.esercizi)}
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
            </Container>
            {/* MODALE CANCELLA ALLENAMENTO SELEZIONATO */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancella Allenamento Selezionato</Modal.Title>
                </Modal.Header>
                <Modal.Body>Cancellare Allenamento ? </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold"
                        onClick={handleClose}
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => {
                            handleClose();
                            handleDelete(AllenamDacancellare);
                        }}
                    >
                        Cancella
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MOSTRA DETTAGLI ALLENAMENTO SELEZIONATO */}
            <Modal show={showEsercizi} onHide={handleCloseEsercizi}>
                <Modal.Header closeButton>
                    <Modal.Title>Dettagli Allenamento</Modal.Title>
                </Modal.Header>

                {/* INSERISCI DETTAGLI DELL'ALLENAMENTO */}
                {DettagliAllenamento && (
                    <Modal.Body>
                        <h3 className="display-6">Esercizi Presenti Nell&apos;allenamento:</h3>
                        {DettagliAllenamento.esercizi.map((es, i) => (
                            <div className="w-100" key={`indice-${i}`}>
                                <img
                                    style={{ maxHeight: "300px", objectFit: "contain" }}
                                    className="w-100"
                                    src={`${LocalHostPath}/img-esercizi/${es.immagineEsercizio}`}
                                    alt="esercizio"
                                />
                                <p className="my-3 fw-semibold fs-4">
                                    - {es.nomeEsercizio} - {es.ripetizioni} x {es.serie}
                                </p>
                            </div>
                        ))}
                    </Modal.Body>
                )}

                <Modal.Footer>
                    <Button variant="warning " className="rounded-4 text-light fw-bold" onClick={handleCloseEsercizi}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AllenamentiDisponibili;
