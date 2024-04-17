// import { useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { annullaAbbonamento } from "../../../redux/actions/fetchAbbonamenti";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PencilSquare } from "react-bootstrap-icons";
import { useEffect } from "react";
import { getDettagliUtente } from "../../../redux/actions/fetchUtenti";

const ModificaDatiUtente = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { TuttiDettagliUtenteLoggato } = useSelector((state) => state.utenti);

    const handleAnnullaAbbonamento = () => {
        dispatch(annullaAbbonamento());
    };

    useEffect(() => {
        dispatch(getDettagliUtente());
    }, [TuttiDettagliUtenteLoggato, dispatch]);

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log("ciao");
    // };

    return (
        <div className="Bg-sfondo-dark min-vh-100 ">
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
                <Row className=" justify-content-center align-items-center row-gap-4">
                    <Col xs="12" sm="10" md="10" lg="6" xl="6">
                        <div className="text-light">
                            {TuttiDettagliUtenteLoggato && (
                                <Card className="rounded rounded-5 my-4 p-3 position-relative shadow-lg  border border-2 effettoVetro text-light scalaAnimazione">
                                    <div className="my-3">
                                        <div>
                                            {" "}
                                            <span className="display-6">nome: </span>
                                            <span className="display-5 fw-semibold">
                                                {TuttiDettagliUtenteLoggato.nome}
                                            </span>
                                        </div>

                                        <div>
                                            {" "}
                                            <span className="display-6">cognome: </span>
                                            <span className="display-5 fw-semibold">
                                                {TuttiDettagliUtenteLoggato.cognome}
                                            </span>
                                        </div>

                                        <div>
                                            {" "}
                                            <span className="display-6">email: </span>
                                            <span className="display-6 fw-semibold">
                                                {TuttiDettagliUtenteLoggato.email}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="my-2">
                                        {" "}
                                        <span className="fs-4 fw-normal"> data Inizio Abbonamento:</span>
                                        <div className=" fs-2 fw-semibold">
                                            {TuttiDettagliUtenteLoggato.dataInizioAbbonamento === null ? (
                                                <span className="text-danger">non disponibile</span>
                                            ) : (
                                                <span className=" text-success">
                                                    {new Date(
                                                        TuttiDettagliUtenteLoggato.dataInizioAbbonamento
                                                    ).toLocaleDateString("it-IT") +
                                                        " - " +
                                                        new Date(
                                                            TuttiDettagliUtenteLoggato.dataInizioAbbonamento
                                                        ).toLocaleTimeString("it-IT")}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        {" "}
                                        <span className="fs-4 fw-normal"> data fine abbonamento:</span>
                                        <div className=" fs-2 fw-semibold">
                                            {TuttiDettagliUtenteLoggato.dataFineAbbonamento === null ? (
                                                <span className="text-danger">non disponibile</span>
                                            ) : (
                                                <span className=" text-success">
                                                    {new Date(
                                                        TuttiDettagliUtenteLoggato.dataFineAbbonamento
                                                    ).toLocaleDateString("it-IT") +
                                                        " - " +
                                                        new Date(
                                                            TuttiDettagliUtenteLoggato.dataFineAbbonamento
                                                        ).toLocaleTimeString("it-IT")}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Card>
                            )}
                        </div>
                    </Col>
                    <Col xs="12" sm="10" md="10" lg="6" xl="4">
                        {/* nome */}
                        <div className="text-light">
                            <Form /*onSubmit={handleSubmit}*/>
                                <Form.Group className="my-3" controlId="nome">
                                    <Form.Label className="fs-1 fw-normal m-auto">Nome</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control type="text" placeholder="Inserisci un nuovo Nome." />
                                        <Button type="submit" variant="transparent">
                                            <PencilSquare size={30} className="text-light" />
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Form>
                            {/* cognome  */}
                            <Form>
                                <Form.Group className="my-3" controlId="cognome">
                                    <Form.Label className="fs-1 fw-normal m-auto">Cognome</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control type="text" placeholder="Inserisci un nuovo cognome." />
                                        <Button type="submit" variant="transparent">
                                            <PencilSquare size={30} className="text-light" />
                                        </Button>
                                    </div>
                                </Form.Group>
                            </Form>
                            {/* email */}
                            <Form>
                                <Form.Group className="my-3" controlId="email">
                                    <Form.Label className="fs-1 fw-normal m-auto">Email</Form.Label>
                                    <Form.Control type="text" placeholder="Inserisci una nuova mail" />
                                </Form.Group>
                            </Form>
                            {/* cambio password  */}
                            {/* <Form>
                                <Form.Group className="my-3" controlId="vecchiaPassword">
                                    <Form.Label className="fs-1 fw-normal m-auto">Vecchia Password</Form.Label>
                                    <Form.Control type="password" placeholder="Inserisci la vecchia Password" />
                                </Form.Group>

                                <Form.Group className="my-3" controlId="Nuovapassword">
                                    <Form.Label className="fs-1 fw-normal m-auto"> Nuova Password</Form.Label>
                                    <Form.Control type="password" placeholder="Inserisci una nuova Password" />
                                </Form.Group>

                                <Form.Group className="my-3" controlId="confermaNuovaPassword">
                                    <Form.Label className="fs-1 fw-normal m-auto">Conferma Nuova Password</Form.Label>
                                    <Form.Control type="password" placeholder="Conferma la nuova Password" />
                                </Form.Group>
                            </Form> */}
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    <Col xs="12" sm="10" md="10" lg="6" xl="4">
                        <div className="d-flex gap-2 my-4 justify-content-center">
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
                    </Col>
                </Row>
            </Container>{" "}
        </div>
    );
};

export default ModificaDatiUtente;
