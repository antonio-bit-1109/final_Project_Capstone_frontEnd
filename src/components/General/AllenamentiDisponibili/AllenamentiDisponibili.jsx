import { useEffect, useState } from "react";
import { AllenamentoFiltrato, CancellaAllenamento, GetListaAllenamenti } from "../../../redux/actions/fetchAllenamento";
import { LocalHostPath } from "../../../functions/localHostPath";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { setAllenamentoSceltogiaCreato } from "../../../redux/reducers/allenamentiReducer";
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
    const [Inputricerca, setInputRicerca] = useState(null);
    const [difficoltaAllenamento, setDifficoltaAllenamento] = useState(null);
    const [difficultIsClicked, setDifficultIsClicked] = useState([false, false, false]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseEsercizi = () => setShowEsercizi(false);
    const handleShowEsercizi = () => setShowEsercizi(true);

    useEffect(() => {
        dispatch(GetListaAllenamenti(LocalHostPath + "/Allenamento/ListaAllenamenti"));
    }, [dispatch]);

    useEffect(() => {
        if (Inputricerca || difficoltaAllenamento || !difficoltaAllenamento) {
            dispatch(AllenamentoFiltrato(Inputricerca, difficoltaAllenamento));
        }
    }, [Inputricerca, dispatch, difficoltaAllenamento]);

    const handleDelete = (id) => {
        // cancella allenamento a partire dall'id
        dispatch(CancellaAllenamento(LocalHostPath + `/Allenamento/CancellaAllenamento/${id}`)).then(() => {
            // Aggiorna la lista degli allenamenti dopo aver cancellato un allenamento
            dispatch(GetListaAllenamenti(LocalHostPath + "/Allenamento/ListaAllenamenti"));
        });
    };

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
        <div className="Bg-sfondo-dark min-vh-100">
            <Container>
                <Row className=" justify-content-center">
                    <Col xs="12" sm="10" md="9" lg="8" xl="7">
                        <div className="d-flex align-items-center justify-content-center">
                            {" "}
                            <div className="my-4 w-75">
                                {/* input per ricerca allenamento */}
                                <Form.Control
                                    className="rounded-0 rounded-start-2"
                                    type="text"
                                    id="ricercaAllenamenti"
                                    aria-describedby="ricercaAllenamenti"
                                    value={Inputricerca}
                                    onChange={(e) => {
                                        setInputRicerca(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="d-flex justify-content-center align-items-center h-100">
                                <Button
                                    onClick={() => {
                                        setDifficoltaAllenamento(1);
                                        setDifficultIsClicked(() => {
                                            let array = [false, false, false];
                                            array[0] = !array[0];
                                            return array;
                                        });
                                    }}
                                    variant="transparent"
                                    className={`bordino rounded-0 p-0 enlight_green ${
                                        difficultIsClicked[0] ? "_green" : ""
                                    }`}
                                >
                                    <Card className="p-0" bg="transparent">
                                        <Card.Body className="py-1 px-4 text-light">Facile</Card.Body>
                                    </Card>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setDifficoltaAllenamento(2);
                                        setDifficultIsClicked(() => {
                                            let array = [false, false, false];
                                            array[1] = !array[1];
                                            return array;
                                        });
                                    }}
                                    variant="transparent"
                                    className={`bordino rounded-0 p-0 enlight_yellow ${
                                        difficultIsClicked[1] ? "_yellow" : ""
                                    }`}
                                >
                                    <Card
                                        // onClick={Selected}
                                        className="p-0"
                                        bg="transparent"
                                    >
                                        <Card.Body className="py-1 px-4 text-light">Media</Card.Body>
                                    </Card>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setDifficoltaAllenamento(3);
                                        setDifficultIsClicked(() => {
                                            let array = [false, false, false];
                                            array[2] = !array[2];
                                            return array;
                                        });
                                    }}
                                    variant="transparent"
                                    className={`bordino rounded-0 p-0 enlight_red  ${
                                        difficultIsClicked[2] ? "_red" : ""
                                    }`}
                                >
                                    <Card
                                        // onClick={Selected}
                                        className="p-0"
                                        bg="transparent"
                                    >
                                        <Card.Body className="py-1 px-4 text-light">Difficile</Card.Body>
                                    </Card>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setDifficoltaAllenamento(null);
                                        setDifficultIsClicked(() => {
                                            let array = [false, false, false];
                                            return array;
                                        });
                                    }}
                                    variant="transparent"
                                    className={`bordino rounded-0 rounded-end-2 p-0 enlight_white  ${
                                        !difficultIsClicked[0] && !difficultIsClicked[1] && !difficultIsClicked[2]
                                            ? "_white"
                                            : ""
                                    }`}
                                >
                                    <Card
                                        // onClick={Selected}
                                        className="p-0"
                                        bg="transparent"
                                    >
                                        <Card.Body className="py-1 rounded-end-2 px-4 text-light">Tutti</Card.Body>
                                    </Card>
                                </Button>
                            </div>
                        </div>
                    </Col>
                </Row>
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
                                                                        : mediaDifficolta(
                                                                              allenamento.dIfficoltaMedia
                                                                          ) === "Media"
                                                                        ? "orange"
                                                                        : mediaDifficolta(
                                                                              allenamento.dIfficoltaMedia
                                                                          ) === "Difficile"
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
