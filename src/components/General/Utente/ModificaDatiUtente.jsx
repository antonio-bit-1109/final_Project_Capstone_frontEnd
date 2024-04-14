// import { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { annullaAbbonamento } from "../../../redux/actions/fetchAbbonamenti";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "react-bootstrap-icons";

const ModificaDatiUtente = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { TuttiDettagliUtenteLoggato } = useSelector((state) => state.utenti);

    const handleAnnullaAbbonamento = () => {
        dispatch(annullaAbbonamento());
    };

    return (
        <div className="Bg-sfondo altezza-sfondo">
            {" "}
            <Container>
                <Row>
                    <Col>
                        <div className="my-1">
                            <Button
                                onClick={() => navigate("/")}
                                variant="transparent"
                                className="rounded-4 text-light fw-bolder fs-1"
                            >
                                {" "}
                                <ArrowLeft size={120} />
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="text-light">
                            {TuttiDettagliUtenteLoggato && (
                                <>
                                    <div>nome: {TuttiDettagliUtenteLoggato.nome}</div>
                                    <div>cognome: {TuttiDettagliUtenteLoggato.cognome}</div>
                                    <div>email: {TuttiDettagliUtenteLoggato.email}</div>
                                    <div>
                                        {" "}
                                        data Inizio Abbonamento:{" "}
                                        {TuttiDettagliUtenteLoggato.dataInizioAbbonamento === null
                                            ? "non disponibile"
                                            : TuttiDettagliUtenteLoggato.dataInizioAbbonamento}
                                    </div>
                                    <div>
                                        {" "}
                                        data fine abbonamento:{" "}
                                        {TuttiDettagliUtenteLoggato.dataFineAbbonamento === null
                                            ? "non disponibile"
                                            : TuttiDettagliUtenteLoggato.dataFineAbbonamento}
                                    </div>
                                </>
                            )}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form>
                            <Form.Group className="my-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci un nuovo Nome." />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="cognome">
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci un nuovo cognome." />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci una nuova mail" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="vecchiaPassword">
                                <Form.Label>Vecchia Password</Form.Label>
                                <Form.Control type="password" placeholder="Inserisci la vecchia Password" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="Nuovapassword">
                                <Form.Label> Nuova Password</Form.Label>
                                <Form.Control type="password" placeholder="Inserisci una nuova Password" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="confermaNuovaPassword">
                                <Form.Label>Conferma Nuova Password</Form.Label>
                                <Form.Control type="password" placeholder="Conferma la nuova Password" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <div>INSERISCI BOTTONE PER ANNULLARE ABBONAMENTO </div>
                    <div className="d-flex gap-2">
                        <Button
                            variant="light"
                            className="rounded-4 text-warning border-warning fw-bold"
                            onClick={handleAnnullaAbbonamento}
                        >
                            {" "}
                            Annulla Abbonamento{" "}
                        </Button>
                        <Button
                            variant="warning "
                            className="rounded-4 text-light fw-bold"
                            onClick={() => navigate("/StoricoAcquisti")}
                        >
                            {" "}
                            Storico acquisti{" "}
                        </Button>
                    </div>
                </Row>
            </Container>{" "}
        </div>
    );
};

export default ModificaDatiUtente;
