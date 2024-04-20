import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { CreateEsercizio } from "../../../redux/actions/fetchEsercizi";

// eslint-disable-next-line react/prop-types
const ModaleCreazioneNuovoEsercizio = ({ showCreateEsercizio, setShowCreateEsercizio }) => {
    const dispatch = useDispatch();

    const [ImmagineCreateEsercizio, setImmagineCreateEsercizio] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const handleCloseCreateEsercizio = () => setShowCreateEsercizio(false);
    const submitHandlerCreateEsercizio = (data) => {
        handleCloseCreateEsercizio();

        const formData = new FormData();
        formData.append("ImmagineEsercizio", ImmagineCreateEsercizio);

        dispatch(CreateEsercizio(data, formData));
        reset();
    };
    return (
        <>
            {" "}
            {/* MODALE PER CREAZIONE NUOVO ESERCIZIO */}
            <Modal show={showCreateEsercizio} onHide={handleCloseCreateEsercizio}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea Nuovo Esercizio </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* INPUT PER INVIO ESERCIZIO CON REACT HOOK FORMS */}
                    <Form onSubmit={handleSubmit(submitHandlerCreateEsercizio)}>
                        {/* NOME ESERCIZIO STRING  */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="nomeEsercizioInput">
                                Nome Esercizio{" "}
                            </Form.Label>
                            <Form.Control
                                {...register("NomeEsercizio", {
                                    required: "Inserisci il nome dell' esercizio.",
                                    pattern: {
                                        value: /^[A-Za-z\s.,!?àèìòùÀÈÌÒÙ',"-]+$/i,
                                        message: "Il nome può contenere solo lettere maiuscole o minuscole ",
                                    },
                                })}
                                type="text"
                                id="nomeEsercizioInput"
                                aria-describedby="nomeEsercizioInput"
                            />
                            {errors.NomeEsercizio && <div className="text-danger">{errors.NomeEsercizio.message}</div>}
                        </Form.Group>

                        {/* IMMAGINE ESERCIZIO FILE */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="ImmagineEsercizioInput">
                                Immagine Esercizio{" "}
                            </Form.Label>
                            <Form.Control
                                accept="image/*"
                                type="file"
                                id="ImmagineEsercizioInput"
                                aria-describedby="ImmagineEsercizioInput"
                                onChange={(e) => setImmagineCreateEsercizio(e.target.files[0])}
                            />
                        </Form.Group>

                        {/* DESCRIZIONE ESERCIZIO STRING */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputDescrizioneEsercizio">
                                Descrizione{" "}
                            </Form.Label>
                            <Form.Control
                                {...register("DescrizioneEsercizio", {
                                    required: "Inserisci una descrizione per l'esercizio.",
                                    pattern: {
                                        value: /^[A-Za-z\s.,!?àèìòùÀÈÌÒÙ',"0-9]+$/i,
                                        message: "Il nome può contenere solo lettere maiuscole o minuscole",
                                    },
                                })}
                                type="text"
                                id="inputDescrizioneEsercizio"
                                aria-describedby="inputDescrizioneEsercizio"
                            />
                            {errors.DescrizioneEsercizio && (
                                <div className="text-danger">{errors.DescrizioneEsercizio.message}</div>
                            )}
                        </Form.Group>

                        {/* DIFFICOLTA ESERCIZIO */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputDifficoltaEsercizio">
                                Difficoltà Esercizio{" "}
                            </Form.Label>
                            <Form.Control
                                {...register("DifficoltaEsercizio", {
                                    required: "Inserisci un valore per la difficoltà.",
                                    pattern: {
                                        value: /^[1-3]+$/i,
                                        message: " Inserisci un valore tra 1 e 3.",
                                    },
                                })}
                                type="number"
                                id="inputDifficoltaEsercizio"
                                aria-describedby="inputDescrizioneEsercizio"
                                min={1}
                                max={3}
                            />
                            {errors.DifficoltaEsercizio && (
                                <div className="text-danger">{errors.DifficoltaEsercizio.message}</div>
                            )}
                        </Form.Group>

                        {/* ESERCIZIO FORZA O NO BOOL */}
                        <Form.Group className="my-3">
                            {" "}
                            <Form.Check
                                {...register("IsStrenght")}
                                className="m-auto" // prettier-ignore
                                type="switch"
                                label="Esercizio di Forza"
                                id="EsercizioForza"
                            />
                            {errors.IsStrenght && <div className="text-danger">{errors.IsStrenght.message}</div>}
                        </Form.Group>

                        {/* TEMPO RECUPERO ESERCIZIO INT */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputRecuperoEsercizio">
                                Tempo Di Recupero (sec&quot;){" "}
                            </Form.Label>
                            <Form.Control
                                {...register("TempoRecupero", {
                                    required: "Inserisci un tempo di recupero.",
                                    pattern: {
                                        value: /^[0-9]+$/i,
                                        message: "Inserisci il valore in Secondi.",
                                    },
                                })}
                                type="number"
                                id="inputRecuperoEsercizio"
                                aria-describedby="inputRecuperoEsercizio"
                            />
                            {errors.TempoRecupero && <div className="text-danger">{errors.TempoRecupero.message}</div>}
                        </Form.Group>

                        {/* SERIE ESERCIZIO INT */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputSerieEsercizio">
                                N° Serie
                            </Form.Label>
                            <Form.Control
                                {...register("SerieEsercizio", {
                                    required: "Inserisci un numero di serie.",
                                    pattern: {
                                        value: /^[0-9]+$/i,
                                        message: "Inserisci un valore intero tra 0 e 9.",
                                    },
                                })}
                                type="number"
                                id="inputSerieEsercizio"
                                aria-describedby="inputSerieEsercizio"
                            />
                            {errors.SerieEsercizio && (
                                <div className="text-danger">{errors.SerieEsercizio.message}</div>
                            )}
                        </Form.Group>

                        {/* RIPETIZIONI ESERCIZIO INT */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputRipetizioniEsercizio">
                                N° Ripetizioni{" "}
                            </Form.Label>
                            <Form.Control
                                {...register("RipetizioniEsercizio", {
                                    required: "Inserisci un numero di ripetizioni.",
                                    pattern: {
                                        value: /^[0-9]+$/i,
                                        message: "Inserisci un valore intero tra 4 e 20.",
                                    },
                                })}
                                type="number"
                                id="inputRipetizioniEsercizio"
                                aria-describedby="inputRipetizioniEsercizio"
                            />
                            {errors.RipetizioniEsercizio && (
                                <div className="text-danger">{errors.RipetizioniEsercizio.message}</div>
                            )}
                        </Form.Group>

                        {/* MET */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputSerieEsercizio">
                                MET (Metabolic Equivalent of Task)
                            </Form.Label>
                            <Form.Control
                                {...register("met", {
                                    required: "Inserisci un valore tra 1 e 15.",
                                    pattern: {
                                        value: /^(1[0-5]|[1-9])$/i,
                                        message: "Inserisci un valore intero tra 1 e 15.",
                                    },
                                })}
                                type="number"
                                id="metEsercizio"
                                aria-describedby="inputmetEsercizio"
                            />
                            {errors.met && <div className="text-danger">{errors.met.message}</div>}
                        </Form.Group>

                        {/* PARTE CORPO ESERCIZIO STRING */}
                        <Form.Group className="my-3">
                            {" "}
                            <Form.Select
                                {...register("ParteCorpoEsercizio", {
                                    required: "Inserisci un valore.",
                                })}
                                // value={}
                                // onChange={(e) => setParteCorpo(e.target.value === "null" ? null : e.target.value)}
                                aria-label="Default select example"
                            >
                                <option value=""> Parte Del Corpo: </option>
                                <option value="petto">Petto</option>
                                <option value="gambe">Gambe</option>
                                <option value="bicipiti">Bicipiti</option>
                                <option value="spalle">Spalle</option>
                                <option value="tricipiti">Tricipiti</option>
                                <option value="fullbody">Full Body</option>
                            </Form.Select>
                            {errors.ParteCorpoEsercizio && (
                                <div className="text-danger">{errors.ParteCorpoEsercizio.message}</div>
                            )}
                        </Form.Group>

                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={handleCloseCreateEsercizio}
                            >
                                Chiudi
                            </Button>
                            <Button variant="warning " className="rounded-4 text-light fw-bold" type="submit">
                                Crea Nuovo Esercizio
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModaleCreazioneNuovoEsercizio;
