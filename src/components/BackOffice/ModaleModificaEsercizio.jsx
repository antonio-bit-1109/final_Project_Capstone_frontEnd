/* eslint-disable react/prop-types */
import { Button, Form, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { ModificaEsercizioFetch } from "../../redux/actions/fetchEsercizi";
import { useState } from "react";
// import { useForm } from "react-hook-form";

const ModaleModificaEsercizio = ({
    showModaleEditEsercizio,
    handleCloseMOdaleEditEsercizio,
    datiEsercizioMOdifica,
    setDatiEsercizioModifica,
    idEsercizio,
}) => {
    const dispatch = useDispatch();

    const [immagineEsercizio, setImmagineEsercizio] = useState(null);

    const EditEsercizio = (e) => {
        e.preventDefault();
        handleCloseMOdaleEditEsercizio();

        const formData = new FormData();
        formData.append("immagineEsercizio", immagineEsercizio);

        console.log(datiEsercizioMOdifica);
        dispatch(ModificaEsercizioFetch(idEsercizio, datiEsercizioMOdifica, formData));
    };

    return (
        <>
            <Modal show={showModaleEditEsercizio} onHide={handleCloseMOdaleEditEsercizio}>
                {" "}
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Esercizio Selezionato </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* INPUT PER INVIO ESERCIZIO CON REACT HOOK FORMS */}
                    <Form onSubmit={EditEsercizio}>
                        {/* NOME ESERCIZIO MODIFICA  */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="nomeEsercizioInput">
                                Nome Esercizio{" "}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="nomeEsercizioInput"
                                aria-describedby="nomeEsercizioInput"
                                value={datiEsercizioMOdifica.nomeEsercizio}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        nomeEsercizio: e.target.value,
                                    })
                                }
                            />
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
                                onChange={(e) => setImmagineEsercizio(e.target.files[0])}
                            />
                        </Form.Group>

                        {/* DESCRIZIONE ESERCIZIO STRING */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputDescrizioneEsercizio">
                                Descrizione{" "}
                            </Form.Label>
                            <Form.Control
                                type="text"
                                id="inputDescrizioneEsercizio"
                                aria-describedby="inputDescrizioneEsercizio"
                                value={datiEsercizioMOdifica.descrizioneEsercizio}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        descrizioneEsercizio: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        {/* DIFFICOLTA ESERCIZIO */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputDifficoltaEsercizio">
                                Difficoltà Esercizio{" "}
                            </Form.Label>
                            <Form.Control
                                type="number"
                                id="inputDifficoltaEsercizio"
                                aria-describedby="inputDescrizioneEsercizio"
                                min={1}
                                max={3}
                                value={datiEsercizioMOdifica.difficoltaEsercizio}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        difficoltaEsercizio: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        {/* ESERCIZIO FORZA O NO BOOL */}
                        <Form.Group className="my-3">
                            {" "}
                            <Form.Check
                                className="m-auto"
                                type="switch"
                                label="Esercizio di Forza"
                                id="EsercizioForza"
                                checked={datiEsercizioMOdifica.IsStrenght}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        IsStrenght: e.target.checked,
                                    })
                                }
                            />
                        </Form.Group>

                        {/* TEMPO RECUPERO ESERCIZIO INT */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputRecuperoEsercizio">
                                Tempo Di Recupero (sec&quot;){" "}
                            </Form.Label>
                            <Form.Control
                                type="number"
                                id="inputRecuperoEsercizio"
                                aria-describedby="inputRecuperoEsercizio"
                                value={datiEsercizioMOdifica.tempoRecupero}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        tempoRecupero: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        {/* SERIE ESERCIZIO INT */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputSerieEsercizio">
                                N° Serie
                            </Form.Label>
                            <Form.Control
                                type="number"
                                id="inputSerieEsercizio"
                                aria-describedby="inputSerieEsercizio"
                                value={datiEsercizioMOdifica.Serie}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        Serie: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        {/* RIPETIZIONI ESERCIZIO INT */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputRipetizioniEsercizio">
                                N° Ripetizioni{" "}
                            </Form.Label>
                            <Form.Control
                                type="number"
                                id="inputRipetizioniEsercizio"
                                aria-describedby="inputRipetizioniEsercizio"
                                value={datiEsercizioMOdifica.ripetizioni}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        ripetizioni: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        {/* MET */}
                        <Form.Group className="my-2">
                            <Form.Label className="m-auto" htmlFor="inputSerieEsercizio">
                                MET (Metabolic Equivalent of Task)
                            </Form.Label>
                            <Form.Control
                                type="number"
                                id="metEsercizio"
                                aria-describedby="inputmetEsercizio"
                                value={datiEsercizioMOdifica.met}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        met: e.target.value,
                                    })
                                }
                            />
                        </Form.Group>

                        {/* PARTE CORPO ESERCIZIO STRING */}
                        <Form.Group className="my-3">
                            {" "}
                            <Form.Select
                                aria-label="Default select example"
                                value={datiEsercizioMOdifica.parteDelCorpoAllenata}
                                onChange={(e) =>
                                    setDatiEsercizioModifica({
                                        ...datiEsercizioMOdifica,
                                        parteDelCorpoAllenata: e.target.value,
                                    })
                                }
                            >
                                <option value=""> Parte Del Corpo: </option>
                                <option value="petto">Petto</option>
                                <option value="gambe">Gambe</option>
                                <option value="bicipiti">Bicipiti</option>
                                <option value="spalle">Spalle</option>
                                <option value="tricipiti">Tricipiti</option>
                                <option value="fullbody">Full Body</option>
                            </Form.Select>
                        </Form.Group>

                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={handleCloseMOdaleEditEsercizio}
                            >
                                Chiudi
                            </Button>
                            <Button type="submit" variant="warning " className="rounded-4 text-light fw-bold">
                                Modifica Esercizio Selezionato
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModaleModificaEsercizio;
