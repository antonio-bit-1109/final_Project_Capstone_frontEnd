import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { PostUtenteRegistrato } from "../../../redux/actions/fetchUtenti";
import { LocalHostPath } from "../../../functions/localHostPath";
import { useDispatch, useSelector } from "react-redux";
import { isModaleCreateUtenteVisible } from "../../../redux/reducers/backOffice2Reducer";

// eslint-disable-next-line react/prop-types
const ModaleCreaNuovoUtente = ({ text }) => {
    const dispatch = useDispatch();

    const { showModaleCreateUtente } = useSelector((store) => store.BackOffice2);

    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
        reset,
    } = useForm();
    const password = watch("password", "");

    const submitHandlerRegistration = (data) => {
        console.log(data);
        //PER CHIUDERE IL MODALE DOPO LA REGISTRAZIONE
        dispatch(PostUtenteRegistrato(LocalHostPath + "/Auth/registrazione", data));
        dispatch(isModaleCreateUtenteVisible(false));
        reset();
    };

    return (
        <>
            {" "}
            {/* MODALE PER LA REGISTRAZIONE  */}
            <Modal show={showModaleCreateUtente} onHide={() => dispatch(isModaleCreateUtenteVisible(false))}>
                <Modal.Header closeButton>
                    <Modal.Title> {text} </Modal.Title>
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
                                        message: "Il nome può contenere solo lettere maiuscole o minuscole ",
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
                                        message: "Il cognome può contenere solo lettere maiuscole o minuscole ",
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
                            {errors.altezza && <div className="text-danger">{errors.confermaPassword.message}</div>}
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
                            {errors.peso && <div className="text-danger">{errors.confermaPassword.message}</div>}
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
                            {errors.password && <div className="text-danger">{errors.password.message}</div>}
                        </Form.Group>

                        {/* CONFERMA PASSWORD  */}

                        <Form.Group className="mb-3" controlId="formBasicConfermaPassword">
                            <Form.Label>Conferma Password</Form.Label>
                            <Form.Control
                                {...register("confermaPassword", {
                                    required: "devi confermare la password",
                                    validate: (value) => value === password || "Le password non corrispondono",
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
                                        message: "Formato della mail non valido. Assicurati di aver inserito @ e .",
                                    },
                                })}
                                type="email"
                                placeholder="inserisci Email."
                            />
                            {errors.email && <div className="text-danger">{errors.email.message}</div>}
                        </Form.Group>
                        <Modal.Footer>
                            <Button variant="warning " className="rounded-4 text-light fw-bold" type="submit">
                                Registrati
                            </Button>
                            <Button
                                onClick={() => {
                                    dispatch(isModaleCreateUtenteVisible(false));
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
        </>
    );
};

export default ModaleCreaNuovoUtente;
