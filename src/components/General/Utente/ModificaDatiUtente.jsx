// import { useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { annullaAbbonamento } from "../../../redux/actions/fetchAbbonamenti";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PencilSquare } from "react-bootstrap-icons";
import { useEffect, useRef } from "react";
import { getDettagliUtente } from "../../../redux/actions/fetchUtenti";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddOneCountModale } from "../../../redux/reducers/notificaReducer";

const ModificaDatiUtente = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const RefInfoUtente = useRef();
    const nomeIniziale = useRef();
    const CognomeIniziale = useRef();
    const EmailIniziale = useRef();

    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { CountModale } = useSelector((store) => store.notifica);
    console.log(CountModale);

    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
        // reset,
    } = useForm();

    const handleAnnullaAbbonamento = () => {
        dispatch(annullaAbbonamento());
    };

    useEffect(() => {
        dispatch(AddOneCountModale());
    }, [dispatch]);

    useEffect(() => {
        if (CountModale % 2 === 0) {
            toast.info(" Attenzione, Se modifichi i dati personali dovrai rieseguire di nuovo il login!", {
                autoClose: 4000,
                position: "top-right",
            });
        }

        if (TuttiDettagliUtenteLoggato) {
            RefInfoUtente.current = TuttiDettagliUtenteLoggato;
            nomeIniziale.current = TuttiDettagliUtenteLoggato.nome;
            CognomeIniziale.current = TuttiDettagliUtenteLoggato.cognome;
            EmailIniziale.current = TuttiDettagliUtenteLoggato.email;

            if (TuttiDettagliUtenteLoggato !== RefInfoUtente.current) {
                dispatch(getDettagliUtente());
            }
        }
    }, [TuttiDettagliUtenteLoggato, dispatch]);

    const submitHandlerDatiUtente = (data) => {
        //invio dati form e id utente al server
        console.log(data);
        console.log(TuttiDettagliUtenteLoggato.idUtente);
    };

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
                <Row>
                    <Col>
                        <div className="my-1 text-light">
                            <h2 className="display-3 fw-semibold text-center">Modifica Dati </h2>
                        </div>
                    </Col>
                </Row>
                <Row className=" justify-content-center align-items-center row-gap-4">
                    <Col xs="12" sm="10" md="10" lg="6" xl="6">
                        <div className="text-light">
                            {TuttiDettagliUtenteLoggato && (
                                <Card className="rounded rounded-5 my-4 p-3 position-relative shadow-lg  border border-2 effettoVetro text-light scalaAnimazione">
                                    <div className="my-3">
                                        <div className="my-1">
                                            {" "}
                                            <span className="display-6">nome: </span>
                                            <span className="display-5 fw-semibold">
                                                {TuttiDettagliUtenteLoggato.nome}
                                            </span>
                                        </div>

                                        <div className="my-1">
                                            {" "}
                                            <span className="display-6">cognome: </span>
                                            <span className="display-5 fw-semibold">
                                                {TuttiDettagliUtenteLoggato.cognome}
                                            </span>
                                        </div>

                                        <div className="my-1">
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
                        <div className="text-light">
                            <Form onSubmit={handleSubmit(submitHandlerDatiUtente)} /*onSubmit={handleSubmit}*/>
                                {/* nome */}
                                <Form.Group className="my-3" controlId="nome">
                                    <Form.Label className="fs-1 fw-normal m-auto">Nome</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            {...register("nome", {
                                                required: false,
                                                pattern: {
                                                    value: /^[A-Za-z1234567890]+$/i,
                                                    message: "Il nome deve contenere solo lettere o numeri.",
                                                },
                                                validate: (value) =>
                                                    value !== nomeIniziale.current ||
                                                    "Il nome deve essere diverso da quello attualmente in uso.",
                                            })}
                                            type="text"
                                            placeholder="Inserisci un nuovo Nome."
                                        />

                                        <Button type="submit" variant="transparent">
                                            <PencilSquare size={30} className="text-light" />
                                        </Button>
                                    </div>
                                </Form.Group>
                                {errors.nome && <div className="text-danger m-auto">{errors.nome.message}</div>}

                                {/* cognome  */}
                                <Form.Group className="my-3" controlId="cognome">
                                    <Form.Label className="fs-1 fw-normal m-auto">Cognome</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            {...register("cognome", {
                                                required: false,
                                                pattern: {
                                                    value: /^[A-Za-z1234567890]+$/i,
                                                    message: "Il cognome deve contenere solo lettere o numeri.",
                                                },
                                                validate: (value) =>
                                                    value !== CognomeIniziale.current ||
                                                    "Il cognome deve essere diverso da quello attualmente in uso.",
                                            })}
                                            type="text"
                                            placeholder="Inserisci un nuovo cognome."
                                        />
                                        <Button type="submit" variant="transparent">
                                            <PencilSquare size={30} className="text-light" />
                                        </Button>
                                    </div>
                                </Form.Group>
                                {errors.cognome && <div className="text-danger m-auto">{errors.cognome.message}</div>}

                                {/* email */}
                                <Form.Group className="my-3" controlId="email">
                                    <Form.Label className="fs-1 fw-normal m-auto">Email</Form.Label>
                                    <div className="d-flex align-items-center">
                                        <Form.Control
                                            {...register("email", {
                                                required: false,
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message: "Formato Email non valido.",
                                                },
                                                validate: (value) =>
                                                    value !== EmailIniziale.current ||
                                                    "L' E-Mail deve essere diversa da quella attualmente in uso.",
                                            })}
                                            type="text"
                                            placeholder="Inserisci una nuova mail"
                                        />
                                        <Button type="submit" variant="transparent">
                                            <PencilSquare size={30} className="text-light" />
                                        </Button>
                                    </div>
                                </Form.Group>
                                {errors.email && <div className="text-danger m-auto">{errors.email.message}</div>}
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
