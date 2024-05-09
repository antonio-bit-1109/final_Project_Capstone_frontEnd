import { useDispatch, useSelector } from "react-redux";
import { PostUtenteRegistrato } from "../../../redux/actions/fetchUtenti";
import { LocalHostPath } from "../../../functions/localHostPath";
import { useForm } from "react-hook-form";
import { Button, Form } from "react-bootstrap";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { ArrowLeft } from "react-bootstrap-icons";
import { isDivAccessoVisible, isDivFlipped, isDivRegistrazioneVisible } from "../../../redux/reducers/showDivLogin";

const FormPerRegistrazioneNuovoUtente = () => {
    const dispatch = useDispatch();

    const { UtenteAppenaRegistrato } = useSelector((store) => store.utenti);

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
        // handleCloseReg();
        reset();
    };

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
        <div className="loginDiv rounded rounded-5 p-5 border border-light">
            {" "}
            <div className="text-light">
                <div className="d-flex align-items-center">
                    {" "}
                    <h2 className="text-light me-auto">Registrati</h2>
                    <Button
                        onClick={() => {
                            dispatch(isDivFlipped(false));
                            dispatch(isDivAccessoVisible(false));
                            dispatch(isDivRegistrazioneVisible(false));
                        }}
                        variant="transparent"
                    >
                        <ArrowLeft size={60} color="white" />
                    </Button>
                </div>
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

                    <Button variant="warning " className="rounded-4 text-light fw-bold" type="submit">
                        Registrati
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default FormPerRegistrazioneNuovoUtente;
