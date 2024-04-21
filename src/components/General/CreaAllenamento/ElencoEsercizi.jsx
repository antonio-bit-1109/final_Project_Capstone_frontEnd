/* eslint-disable react/prop-types */
import { Button, Card, Col, Form, Modal } from "react-bootstrap";
import { LocalHostPath } from "../../../functions/localHostPath";
import { useDispatch, useSelector } from "react-redux";
import { PushInArrayAllenamento } from "../../../redux/reducers/allenamentiReducer";
import { useEffect, useState } from "react";
import { PencilSquare, Check } from "react-bootstrap-icons";
import { ModificaSerieEsercizio } from "../../../redux/actions/fetchEsercizi";

const ElencoEsercizi = ({ handleClose }) => {
    const dispatch = useDispatch();
    const [immagineEsercizio, setImmagineEsercizio] = useState("");
    const [showImage, setShowImage] = useState(false);
    const { listaEsercizi } = useSelector((store) => store.esercizi);
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const [showInput, setShowInput] = useState(new Array(listaEsercizi.length).fill(false));
    const [serie, setSerie] = useState(null);

    const handleCloseImage = () => setShowImage(false);
    const handleShowImage = () => setShowImage(true);

    useEffect(() => {
        setShowInput(new Array(listaEsercizi.length).fill(false));
    }, [listaEsercizi]);

    const changeSerieEsercizio = (event, idEsercizio) => {
        event.preventDefault();
        console.log(idEsercizio);

        dispatch(ModificaSerieEsercizio(serie, idEsercizio));
    };

    return (
        <>
            <div className="w-100">
                {listaEsercizi.length > 0 ? (
                    listaEsercizi.map((esercizio, index) => (
                        <Col key={`col-${index}`}>
                            <Card className="rounded rounded-5 my-4 shadow-lg effettoVetro text-light border border-2">
                                {/* MODALE PER MOSTRARE IMMAGINE ESERCIZIO */}
                                <Modal show={showImage} onHide={handleCloseImage} backdrop="static" keyboard={false}>
                                    <Modal.Header closeButton></Modal.Header>
                                    <Modal.Body>
                                        {/* immagine esercizio */}
                                        <Button variant="secondary" onClick={handleClose}>
                                            <Card.Img
                                                style={{
                                                    maxHeight: "100%",
                                                    objectFit: "contains",
                                                    maxWidth: "100%",
                                                }}
                                                src={`${LocalHostPath}/img-esercizi/${immagineEsercizio}`}
                                            />
                                        </Button>
                                    </Modal.Body>
                                </Modal>

                                <Card.Body>
                                    <Card.Title className="d-flex justify-content-center fw-bold fs-3">
                                        {esercizio.nomeEsercizio}
                                    </Card.Title>
                                    <Card.Text className="d-flex justify-content-center fs-5">
                                        {esercizio.descrizioneEsercizio}
                                    </Card.Text>
                                    <div className="d-flex justify-content-around">
                                        <Card.Text>
                                            {" "}
                                            <span className="fw-semibold fs-4">Serie:</span>
                                            {TuttiDettagliUtenteLoggato &&
                                            TuttiDettagliUtenteLoggato.ruolo === "admin" ? (
                                                !showInput[index] ? (
                                                    <div className="d-inline-block position-relative">
                                                        <button
                                                            onClick={() => {
                                                                // setShowInput(!showInput[index]);
                                                                setShowInput((prevState) => {
                                                                    const newState = [...prevState];
                                                                    newState[index] = !newState[index];
                                                                    return newState;
                                                                });
                                                            }}
                                                            className=" buttonStyle1_position"
                                                        >
                                                            <PencilSquare />
                                                        </button>
                                                        <span className="fw-semibold fs-3 ms-2">{esercizio.serie}</span>
                                                    </div>
                                                ) : (
                                                    <Form
                                                        onSubmit={() =>
                                                            changeSerieEsercizio(event, esercizio.idEsercizio)
                                                        }
                                                        className="position-relative"
                                                    >
                                                        <Form.Control
                                                            className="w-25"
                                                            type="number"
                                                            id="serie"
                                                            aria-describedby="numeroserie"
                                                            value={serie}
                                                            onChange={(e) => setSerie(e.target.value)}
                                                            min="1"
                                                        />
                                                        <button
                                                            onClick={() => {
                                                                // setShowInput(!showInput[index]);
                                                                setShowInput((prevState) => {
                                                                    const newState = [...prevState];
                                                                    newState[index] = !newState[index];
                                                                    return newState;
                                                                });
                                                            }}
                                                            className=" buttonStyle2_position"
                                                        >
                                                            <PencilSquare />
                                                        </button>
                                                        <button type="submit" className="buttonStyle3_position">
                                                            <Check className="text-success" size={36} />
                                                        </button>
                                                    </Form>
                                                )
                                            ) : (
                                                <span className="fw-semibold fs-3 ms-2">{esercizio.serie}</span>
                                            )}
                                        </Card.Text>
                                        <Card.Text>
                                            {" "}
                                            <span className="fw-semibold fs-4">Ripetizioni:</span>
                                            <span className="fw-semibold fs-3 ms-2">{esercizio.ripetizioni}</span>
                                        </Card.Text>
                                    </div>
                                    <div className="d-flex justify-content-around">
                                        {" "}
                                        <Card.Text>
                                            {" "}
                                            <span className="fw-semibold fs-4">Tempo Recupero:</span>
                                            <span className="fw-semibold fs-3 ms-2">
                                                {esercizio.tempoRecupero}&quot;
                                            </span>
                                        </Card.Text>
                                        <Card.Text>
                                            {" "}
                                            <span className="fw-semibold fs-4">Difficoltà Esercizio:</span>
                                            <span className="fw-semibold fs-3 ms-2">{esercizio.difficolta} / 3;</span>
                                        </Card.Text>{" "}
                                    </div>

                                    <div className="d-flex gap-2 justify-content-center">
                                        <Button
                                            onClick={() => {
                                                dispatch(PushInArrayAllenamento(esercizio));
                                            }}
                                            variant="warning "
                                            className="rounded-4 text-light fw-bold"
                                        >
                                            Aggiungi al tuo Allenamento
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleShowImage();
                                                setImmagineEsercizio(esercizio.immagineEsercizio);
                                            }}
                                            variant="light"
                                            className="rounded-4 text-warning border-warning fw-bold"
                                        >
                                            Guarda Esecuzione
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <h2 className="fs-3 text-light d-flex justify-content-center my-3">
                        nessun Esercizio Soddisfa i criteri di ricerca.{" "}
                    </h2>
                )}
            </div>
        </>
    );
};

export default ElencoEsercizi;
