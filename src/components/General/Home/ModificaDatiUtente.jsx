// import { useEffect } from "react";
import { Col, Container, Row, Button, Card } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PencilSquare, PersonX } from "react-bootstrap-icons";
import { useEffect, useRef, useState } from "react";
import { getDettagliUtente } from "../../../redux/actions/fetchUtenti";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { AddOneCountModale } from "../../../redux/reducers/notificaReducer";
import ModaleCancellazioneAccount from "./ModificaDatiUtente/ModaleCancellazioneAccount";
import MOdaleConfermaPassCancellazione from "./ModificaDatiUtente/MOdaleConfermaPassCancellazione";
import AnnullaEStoricoAcquisti from "./ModificaDatiUtente/AnnullaEStoricoAcquisti";

const ModificaDatiUtente = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const RefInfoUtente = useRef();
    const nomeIniziale = useRef();
    const CognomeIniziale = useRef();
    const EmailIniziale = useRef();

    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { CountModale } = useSelector((store) => store.notifica);
    console.log("ogni 3 c'è remainder", CountModale);

    const [show, setShow] = useState(false);
    // const [passwordInput, setPasswordInput] = useState("");
    const [dataReactHookForm, setDataReactHookForm] = useState(null);
    const [modaleCancellaAccountIsVisible, setModaleCancellaAccount] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        if (errors.nome || errors.cognome || errors.email) {
            return;
        }
        setShow(true);
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
        // reset,
    } = useForm();

    // const handleAnnullaAbbonamento = () => {
    //     dispatch(annullaAbbonamento());
    // };

    const HandleCloseModale = () => {
        setModaleCancellaAccount(false);
    };
    const HandleShowModale = () => {
        setModaleCancellaAccount(true);
    };

    useEffect(() => {
        dispatch(AddOneCountModale());
        dispatch(getDettagliUtente());
    }, [dispatch]);

    useEffect(() => {
        if (CountModale % 3 === 0) {
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

        return;
    }, [TuttiDettagliUtenteLoggato, dispatch]);

    const submitHandlerDatiUtente = (data) => {
        console.log(data);
        setDataReactHookForm(data);
    };

    return (
        <div className="Bg-sfondo-dark min-vh-100 ">
            {" "}
            <Container>
                <Row>
                    <Col>
                        <div className="d-flex align-items-center">
                            {" "}
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
                            <div className="ms-auto">
                                <Button onClick={HandleShowModale} variant="transparent">
                                    <PersonX size={40} className="text-warning" />
                                    <p className="m-auto text-warning">Elimina Account</p>
                                </Button>
                            </div>
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

                                        <div className="my-1">
                                            {" "}
                                            <span className="display-6">altezza: </span>
                                            <span className="display-6 fw-semibold">
                                                {TuttiDettagliUtenteLoggato.altezza} cm
                                            </span>
                                        </div>

                                        <div className="my-1">
                                            {" "}
                                            <span className="display-6">peso: </span>
                                            <span className="display-6 fw-semibold">
                                                {TuttiDettagliUtenteLoggato.peso} kg
                                            </span>
                                        </div>
                                    </div>

                                    <div className="d-flex">
                                        <div>
                                            <div className="my-2">
                                                {" "}
                                                <span className="fs-4 fw-normal"> data Inizio Abbonamento:</span>
                                                <div className=" fs-2 fw-semibold">
                                                    {TuttiDettagliUtenteLoggato.dataInizioAbbonamento === null ? (
                                                        <span className="text-warning">non disponibile</span>
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
                                                        <span className="text-warning">non disponibile</span>
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
                                        </div>
                                        <div className="m-auto">
                                            <div className="my-2">
                                                {" "}
                                                <span className="fs-4 fw-normal"> Totale Kcal consumate:</span>
                                                <div className=" fs-2 fw-semibold">
                                                    {TuttiDettagliUtenteLoggato.totaleKcalConsumate === 0 ? (
                                                        <span className="text-warning">N/A</span>
                                                    ) : (
                                                        <span className=" text-success">
                                                            {parseFloat(
                                                                TuttiDettagliUtenteLoggato.totaleKcalConsumate.toFixed(
                                                                    2
                                                                )
                                                            ) + "Kcal"}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
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
                                                    value: /^[A-Za-z1234567890 ,.-òàùè+'ì?]+$/i,
                                                    message: "Il nome deve contenere solo lettere o numeri.",
                                                },
                                                validate: (value) =>
                                                    value !== nomeIniziale.current ||
                                                    "Il nome deve essere diverso da quello attualmente in uso.",
                                            })}
                                            type="text"
                                            placeholder="Inserisci un nuovo Nome."
                                        />

                                        <Button type="submit" onClick={handleShow} variant="transparent">
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
                                                    value: /^[A-Za-z1234567890 ,.-òàùè+'ì?]+$/i,
                                                    message: "Il cognome deve contenere solo lettere o numeri.",
                                                },
                                                validate: (value) =>
                                                    value !== CognomeIniziale.current ||
                                                    "Il cognome deve essere diverso da quello attualmente in uso.",
                                            })}
                                            type="text"
                                            placeholder="Inserisci un nuovo cognome."
                                        />
                                        <Button type="submit" onClick={handleShow} variant="transparent">
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
                                        <Button type="submit" onClick={handleShow} variant="transparent">
                                            <PencilSquare size={30} className="text-light" />
                                        </Button>
                                    </div>
                                </Form.Group>
                                {errors.email && <div className="text-danger m-auto">{errors.email.message}</div>}
                                {/* ALTEZZA  E PESO  */}
                                <div className="d-flex">
                                    <div className="w-50">
                                        {/* altezza */}
                                        <Form.Group className="my-3" controlId="altezza">
                                            <Form.Label className="fs-1 fw-normal m-auto">Altezza</Form.Label>
                                            <div className="d-flex align-items-center">
                                                <Form.Control
                                                    {...register("altezza", {
                                                        required: false,
                                                        pattern: {
                                                            value: /^[0123456789]+$/i,
                                                            message: "Formato non valido.",
                                                        },
                                                    })}
                                                    type="number"
                                                    placeholder="Inserire nuova altezza"
                                                />
                                                <Button
                                                    style={{ visibility: "hidden" }}
                                                    type="submit"
                                                    onClick={handleShow}
                                                    variant="transparent"
                                                >
                                                    <PencilSquare size={30} className="text-light" />
                                                </Button>
                                            </div>
                                        </Form.Group>
                                        {errors.altezza && (
                                            <div className="text-danger m-auto">{errors.altezza.message}</div>
                                        )}
                                    </div>
                                    <div className="w-50">
                                        {/* peso */}
                                        <Form.Group className="my-3" controlId="peso">
                                            <Form.Label className="fs-1 fw-normal m-auto">Peso</Form.Label>
                                            <div className="d-flex align-items-center">
                                                <Form.Control
                                                    {...register("peso", {
                                                        required: false,
                                                        pattern: {
                                                            value: /^[0123456789]+$/i,
                                                            message: "Formato non valido.",
                                                        },
                                                    })}
                                                    type="number"
                                                    placeholder="Inserire nuovo peso"
                                                />
                                                <Button type="submit" onClick={handleShow} variant="transparent">
                                                    <PencilSquare size={30} className="text-light" />
                                                </Button>
                                            </div>
                                        </Form.Group>
                                        {errors.peso && <div className="text-danger m-auto">{errors.peso.message}</div>}{" "}
                                    </div>
                                </div>
                            </Form>
                        </div>
                    </Col>
                </Row>
                <AnnullaEStoricoAcquisti />
                <MOdaleConfermaPassCancellazione
                    show={show}
                    dataReactHookForm={dataReactHookForm}
                    handleClose={handleClose}
                />
                <ModaleCancellazioneAccount
                    modaleCancellaAccountIsVisible={modaleCancellaAccountIsVisible}
                    HandleCloseModale={HandleCloseModale}
                    HandleShowModale={HandleShowModale}
                />
            </Container>{" "}
        </div>
    );
};

export default ModificaDatiUtente;
