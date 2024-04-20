import sfondo from "../../assets/bg-login.webp";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { TokenFetch } from "../../redux/actions/TokenFetch";
import { LocalHostPath } from "../../functions/localHostPath";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { setTokenUtente } from "../../redux/reducers/tokenReducer";
import { useForm } from "react-hook-form";
import { PostUtenteRegistrato } from "../../redux/actions/fetchUtenti";

function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();

    const password = watch("password", "");
    const { UtenteAppenaRegistrato } = useSelector((store) => store.utenti);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { TokenUtente } = useSelector((store) => store.token);
    const { DatiUtenteLoggato } = useSelector((store) => store.token);
    const [show, setShow] = useState(false);
    const [showReg, setShowReg] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleCloseReg = () => setShowReg(false);
    const handleShowReg = () => setShowReg(true);

    const [token, setToken] = useState({
        username: "",
        password: "",
    });

    const handleSubmitting = (e) => {
        e.preventDefault();
        // fetch per fare il login con autenticazione
        dispatch(TokenFetch(LocalHostPath + "/Auth/token", token));
    };

    const submitHandlerRegistration = (data) => {
        console.log(data);
        //PER CHIUDERE IL MODALE DOPO LA REGISTRAZIONE
        dispatch(PostUtenteRegistrato(LocalHostPath + "/Auth/registrazione", data));
        handleCloseReg();
        reset();
    };

    useEffect(() => {
        if (TokenUtente) {
            if (DatiUtenteLoggato) {
                toast.success("Benvenuto " + DatiUtenteLoggato.nome, { autoClose: 1500 });
                dispatch(setTokenUtente(TokenUtente));
                navigate("/");
            }

            if (TokenUtente === "Unauthorized") {
                toast.error("Credenziali errate, riprova");
                navigate("/login");
                dispatch(setTokenUtente(null));
                setShow(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [TokenUtente, dispatch, navigate]);

    useEffect(() => {
        if (UtenteAppenaRegistrato !== null) {
            if (UtenteAppenaRegistrato && UtenteAppenaRegistrato.nome === watch("nome")) {
                toast.success("Registrazione avvenuta con successo! Effettua il login per continuare", {
                    position: "top-center",
                    autoClose: 3000,
                });
            }
        }
    }, [UtenteAppenaRegistrato, watch]);

    return (
        <div
            className="d-flex justify-content-center align-items-center"
            style={{
                height: "100vh",
                width: "100%",
                backgroundImage: `url(${sfondo})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
            }}
        >
            <Container>
                <Row className="justify-content-center">
                    <Col xs="12" sm="12" md="6" lg="4">
                        {" "}
                        <div className="loginDiv d-inline-block rounded rounded-5 p-5">
                            <div className="d-flex flex-column align-items-center justify-content-center">
                                {" "}
                                <h1 className="text-light display-3 fw-bold mx-auto">Benvenuto</h1>
                                <h5 className="text-light mb-3 text-center">Accedi o Registrati per continuare </h5>
                            </div>

                            <div className="d-flex justify-content-center gap-3">
                                {" "}
                                <Button
                                    onClick={() => {
                                        handleShow();
                                    }}
                                    variant="warning text-light"
                                    className="rounded-4 text-warning border-warning fw-bold color"
                                >
                                    {" "}
                                    Accedi{" "}
                                </Button>
                                <Button
                                    onClick={handleShowReg}
                                    variant="light"
                                    className="rounded-4 text-warning border-warning fw-bold"
                                >
                                    {" "}
                                    Registrati{" "}
                                </Button>
                            </div>
                        </div>
                        {/* MODALE PER IL LOGIN  */}
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Effettua il Login </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmitting}>
                                    <Form.Group className="mb-3" controlId="IdNome">
                                        <Form.Label>Nome Utente</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="Nome Utente"
                                            value={token.username}
                                            onChange={(e) => setToken({ ...token, username: e.target.value })}
                                        />
                                        <Form.Text className="text-muted">
                                            Fai attenzione a caratteri maiuscoli e minuscoli{" "}
                                        </Form.Text>
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="IdPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            type="password"
                                            placeholder="Password"
                                            value={token.password}
                                            onChange={(e) => setToken({ ...token, password: e.target.value })}
                                        />
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button
                                            variant="light"
                                            className="rounded-4 text-warning border-warning fw-bold"
                                            onClick={() => {
                                                handleClose();
                                                setToken({ username: "", password: "" });
                                            }}
                                        >
                                            Esci
                                        </Button>
                                        <Button
                                            variant="warning "
                                            className="rounded-4 text-light fw-bold"
                                            type="submit"
                                        >
                                            Entra nel Portale
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </Modal>
                        {/* MODALE PER LA REGISTRAZIONE  */}
                        <Modal show={showReg} onHide={handleCloseReg}>
                            <Modal.Header closeButton>
                                <Modal.Title> Registrati </Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleSubmit(submitHandlerRegistration)}>
                                    {/* NOME */}

                                    <Form.Group className="mb-3" controlId="formBasicNome">
                                        <Form.Label>Nome Utente</Form.Label>
                                        <Form.Control
                                            {...register("nome", {
                                                required: "Inserisci il tuo Nome.",
                                                pattern: {
                                                    value: /^[A-Za-z]+$/i,
                                                    message:
                                                        "Il nome può contenere solo lettere maiuscole o minuscole ",
                                                },
                                            })}
                                            type="text"
                                            placeholder="Inserisci il nome "
                                        />
                                        {errors.nome && <div className="text-danger">{errors.nome.message}</div>}
                                    </Form.Group>

                                    {/* COGNOME */}

                                    <Form.Group className="mb-3" controlId="formBasicCognome">
                                        <Form.Label>Cognome</Form.Label>
                                        <Form.Control
                                            {...register("cognome", {
                                                required: "Inserisci il tuo cognome.",
                                                pattern: {
                                                    value: /^[A-Za-z]+$/i,
                                                    message:
                                                        "Il cognome può contenere solo lettere maiuscole o minuscole ",
                                                },
                                            })}
                                            type="text"
                                            placeholder="Inserisci il cognome "
                                        />
                                        {errors.cognome && <div className="text-danger">{errors.cognome.message}</div>}
                                    </Form.Group>

                                    {/* altezza  */}

                                    <Form.Group className="mb-3" controlId="formBasicConfermaPassword">
                                        <Form.Label>Altezza (cm)</Form.Label>
                                        <Form.Control
                                            {...register("altezza", {
                                                required: "inserire altezza in cm",
                                            })}
                                            type="number"
                                            placeholder="Inserisci Altezza"
                                        />
                                        {errors.altezza && (
                                            <div className="text-danger">{errors.confermaPassword.message}</div>
                                        )}
                                    </Form.Group>

                                    {/* peso */}

                                    <Form.Group className="mb-3" controlId="formBasicConfermaPassword">
                                        <Form.Label>Peso (kg)</Form.Label>
                                        <Form.Control
                                            {...register("peso", {
                                                required: "inserire peso in kg",
                                            })}
                                            type="number"
                                            placeholder="Inserisci Peso"
                                        />
                                        {errors.peso && (
                                            <div className="text-danger">{errors.confermaPassword.message}</div>
                                        )}
                                    </Form.Group>

                                    {/* PASSWORD */}

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control
                                            {...register("password", {
                                                required: "Devi inserire una password",
                                                minLength: {
                                                    value: 5,
                                                    message: "Password non valida. Deve contenere almeno 5 caratteri.",
                                                },
                                                pattern: {
                                                    value: /^[A-Za-z0-9]+$/i,
                                                    message: "La password può contenere solo lettere e numeri",
                                                },
                                            })}
                                            type="password"
                                            placeholder="Inserisci Password"
                                        />
                                        {errors.password && (
                                            <div className="text-danger">{errors.password.message}</div>
                                        )}
                                    </Form.Group>

                                    {/* CONFERMA PASSWORD  */}

                                    <Form.Group className="mb-3" controlId="formBasicConfermaPassword">
                                        <Form.Label>Conferma Password</Form.Label>
                                        <Form.Control
                                            {...register("confermaPassword", {
                                                required: "devi confermare la password",
                                                validate: (value) =>
                                                    value === password || "Le password non corrispondono",
                                            })}
                                            type="password"
                                            placeholder="Conferma Password."
                                        />
                                        {errors.confermaPassword && (
                                            <div className="text-danger">{errors.confermaPassword.message}</div>
                                        )}
                                    </Form.Group>

                                    {/* EMAIL  */}

                                    <Form.Group className="mb-3" controlId="formBasicConfermaPassword">
                                        <Form.Label>Email</Form.Label>
                                        <Form.Control
                                            {...register("email", {
                                                required: "Inserisci un email valida.",
                                                pattern: {
                                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                    message:
                                                        "Formato della mail non valido. Assicurati di aver inserito @ e .",
                                                },
                                            })}
                                            type="email"
                                            placeholder="inserisci Email."
                                        />
                                        {errors.email && <div className="text-danger">{errors.email.message}</div>}
                                    </Form.Group>
                                    <Modal.Footer>
                                        <Button
                                            variant="warning "
                                            className="rounded-4 text-light fw-bold"
                                            type="submit"
                                        >
                                            Registrati
                                        </Button>
                                        <Button
                                            onClick={() => {
                                                handleCloseReg();
                                                reset();
                                            }}
                                            variant="light"
                                            className="rounded-4 text-warning border-warning fw-bold"
                                        >
                                            Chiudi
                                        </Button>
                                    </Modal.Footer>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Login;
