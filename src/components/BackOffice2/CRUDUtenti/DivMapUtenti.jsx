import { Button, Card, Col } from "react-bootstrap";
import { X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { LocalHostPath } from "../../../functions/localHostPath";
import { isModaleDeleteUtenteVisible, salvaIdUtente } from "../../../redux/reducers/backOffice2Reducer";

const DivMapUtenti = () => {
    const dispatch = useDispatch();
    const { TuttiUtenti } = useSelector((store) => store.utenti);

    return (
        <Col xs="12" sm="12" md="11" lg="7">
            <div className="d-md-flex flex-md-wrap justify-content-md-center d-lg-block">
                {" "}
                {TuttiUtenti &&
                    TuttiUtenti.map((utente, index) => (
                        <>
                            {" "}
                            <Col key={`the good-${index}`} xs="12" sm="12" md="11" lg="10">
                                <div className="d-md-flex flex-md-wrap justify-content-md-center d-lg-block">
                                    <Card
                                        style={{ height: "90%" }}
                                        className="rounded rounded-5 my-4 shadow-lg effettoVetro text-light border border-2 p-4 mx-1"
                                    >
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                onClick={() => {
                                                    dispatch(isModaleDeleteUtenteVisible(true));
                                                    dispatch(salvaIdUtente(utente.idUtente));
                                                }}
                                                className="me-2"
                                                variant="transparent"
                                            >
                                                <X className="fs-1 text-danger" />
                                            </Button>
                                            {/* {WidthWindows && WidthWindows >= 992 ? (
                                                <Button
                                                    onClick={() => {
                                                        dispatch(salvaIdEsercizio(esercizio.idEsercizio));
                                                        dispatch(
                                                            salvaDatiEsercizio({
                                                                nomeEsercizio: esercizio.nomeEsercizio,
                                                                descrizioneEsercizio: esercizio.descrizioneEsercizio,
                                                                DifficoltaEsercizio: esercizio.difficolta,
                                                                IsStrength: esercizio.isStrenght,
                                                                TempoRecupero: esercizio.tempoRecupero,
                                                                Ripetizioni: esercizio.ripetizioni,
                                                                Serie: esercizio.serie,
                                                                met: esercizio.met,
                                                                ParteDelCorpo: esercizio.parteDelCorpoAllenata,
                                                            })
                                                        );
                                                        console.log("sono il bottone a schermo grande ");
                                                    }}
                                                    variant="transparent"
                                                >
                                                    <PenFill className="fs-5 text-white" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    onClick={() => {
                                                        console.log("sono il bottone schermo piccolo");
                                                        dispatch(isModaleModificaEsercizioVisible(true));
                                                        dispatch(
                                                            salvaDatiEsercizio({
                                                                nomeEsercizio: esercizio.nomeEsercizio,
                                                                descrizioneEsercizio: esercizio.descrizioneEsercizio,
                                                                DifficoltaEsercizio: esercizio.difficolta,
                                                                IsStrength: esercizio.isStrenght,
                                                                TempoRecupero: esercizio.tempoRecupero,
                                                                Ripetizioni: esercizio.ripetizioni,
                                                                Serie: esercizio.serie,
                                                                met: esercizio.met,
                                                                ParteDelCorpo: esercizio.parteDelCorpoAllenata,
                                                            })
                                                        );
                                                    }}
                                                    variant="transparent"
                                                >
                                                    <PenFill className="fs-5 text-white" />
                                                </Button>
                                            )} */}
                                        </div>

                                        <div className="d-flex flex-column">
                                            <div>
                                                <Card.Img
                                                    className="my-3"
                                                    style={{
                                                        height: "200px",
                                                        objectFit: "contain",
                                                        width: "200px",
                                                    }}
                                                    variant="img-top"
                                                    src={`${LocalHostPath}/img-utenti/${utente.immagineProfilo}`}
                                                />
                                            </div>

                                            <div>
                                                {" "}
                                                <Card.Title className="fw-bold fs-2">{utente.nome}</Card.Title>
                                                <Card.Title className="fw-bold fs-2">{utente.cognome}</Card.Title>
                                            </div>
                                            <div>
                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Password Utente:</strong> {utente.password}
                                                </Card.Text>
                                            </div>

                                            <div>
                                                {" "}
                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Altezza:</strong> {utente.altezza}
                                                </Card.Text>
                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Peso:</strong> {utente.peso}
                                                </Card.Text>
                                            </div>
                                            <div>
                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Email Utente:</strong> {utente.email}
                                                </Card.Text>

                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Utente Premium? :</strong>{" "}
                                                    {utente.isPremium ? utente.isPremium : "no"}
                                                </Card.Text>
                                            </div>

                                            <div>
                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Easter-Egg Trovato?:</strong>{" "}
                                                    {utente.isBonusFounded ? utente.isBonusFounded : "no"}
                                                </Card.Text>
                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Data Inizio Abbonamento:</strong>{" "}
                                                    {utente.dataInizioAbbonamento
                                                        ? utente.dataInizioAbbonamento
                                                        : "non disponibile"}
                                                </Card.Text>
                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Data Fine Abbonamento:</strong>{" "}
                                                    {utente.dataFineAbbonamento
                                                        ? utente.dataFineAbbonamento
                                                        : "non disponibile"}
                                                </Card.Text>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </>
                    ))}
            </div>
        </Col>
    );
};

export default DivMapUtenti;
