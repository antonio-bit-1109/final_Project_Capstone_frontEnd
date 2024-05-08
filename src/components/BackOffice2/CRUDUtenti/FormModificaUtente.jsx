import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

const FormModificaUtente = ({ color }) => {
    const dispatch = useDispatch();
    const { datiEsercizio, idEsercizio } = useSelector((store) => store.BackOffice2);

    const [immagineEsercizio, setImmagineEsercizio] = useState(null);

    const EditEsercizio = (e) => {
        e.preventDefault();
        // handleCloseMOdaleEditEsercizio();

        const formData = new FormData();
        formData.append("immagineEsercizio", immagineEsercizio);

        // console.log(datiEsercizioMOdifica);
        // dispatch(ModificaEsercizioFetch(idEsercizio, datiEsercizio, formData));
        // setImmagineEsercizio(null);
    };

    return (
        <div className={`${color}`}>
            {" "}
            <Form onSubmit={EditEsercizio}>
                <div className="d-flex gap-3">
                    {/* NOME UTENTE */}
                    <Form.Group className="my-2">
                        <Form.Label className="m-auto" htmlFor="nomeEsercizioInput">
                            Nome Utente{" "}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="nomeEsercizioInput"
                            aria-describedby="nomeEsercizioInput"
                            // value={datiEsercizio && datiEsercizio.nomeEsercizio}
                            // onChange={(e) =>
                            //     dispatch(
                            //         salvaDatiEsercizio({
                            //             ...datiEsercizio,
                            //             nomeEsercizio: e.target.value,
                            //         })
                            //     )
                            // }
                        />
                    </Form.Group>
                    {/* COGNOME UTENTE */}
                    <Form.Group className="my-2">
                        <Form.Label className="m-auto" htmlFor="nomeEsercizioInput">
                            Cognome Utente{" "}
                        </Form.Label>
                        <Form.Control
                            type="text"
                            id="nomeEsercizioInput"
                            aria-describedby="nomeEsercizioInput"
                            // value={datiEsercizio && datiEsercizio.nomeEsercizio}
                            // onChange={(e) =>
                            //     dispatch(
                            //         salvaDatiEsercizio({
                            //             ...datiEsercizio,
                            //             nomeEsercizio: e.target.value,
                            //         })
                            //     )
                            // }
                        />
                    </Form.Group>
                </div>

                {/* IMMAGINE ESERCIZIO FILE */}
                <Form.Group className="my-2">
                    <Form.Label className="m-auto" htmlFor="ImmagineEsercizioInput">
                        Foto Profilo{" "}
                    </Form.Label>
                    <Form.Control
                        style={{ maxWidth: "71%" }}
                        accept="image/*"
                        type="file"
                        id="ImmagineEsercizioInput"
                        aria-describedby="ImmagineEsercizioInput"
                        onChange={(e) => setImmagineEsercizio(e.target.files[0])}
                    />
                </Form.Group>

                <div className="d-flex gap-3">
                    {/* peso */}
                    <Form.Group className="my-2">
                        <Form.Label className="m-auto" htmlFor="inputDescrizioneEsercizio">
                            Peso
                        </Form.Label>
                        <div className="d-flex gap-2 align-items-center">
                            <Form.Control
                                className="w-50"
                                type="number"
                                id="inputDescrizioneEsercizio"
                                aria-describedby="inputDescrizioneEsercizio"
                                // value={datiEsercizio && datiEsercizio.descrizioneEsercizio}
                                // onChange={(e) =>
                                //     dispatch(
                                //         salvaDatiEsercizio({
                                //             ...datiEsercizio,
                                //             descrizioneEsercizio: e.target.value,
                                //         })
                                //     )
                                // }
                            />
                            <div className="fs-3">Kg</div>
                        </div>
                    </Form.Group>

                    {/* altezza */}
                    <Form.Group className="my-2">
                        <Form.Label className="m-auto" htmlFor="inputDifficoltaEsercizio">
                            Altezza
                        </Form.Label>
                        <div className="d-flex gap-2 align-items-center">
                            <Form.Control
                                className="w-50"
                                type="number"
                                id="inputDescrizioneEsercizio"
                                aria-describedby="inputDescrizioneEsercizio"
                                // value={datiEsercizio && datiEsercizio.descrizioneEsercizio}
                                // onChange={(e) =>
                                //     dispatch(
                                //         salvaDatiEsercizio({
                                //             ...datiEsercizio,
                                //             descrizioneEsercizio: e.target.value,
                                //         })
                                //     )
                                // }
                            />
                            <div className="fs-3">Cm</div>
                        </div>
                    </Form.Group>
                </div>

                <div>
                    {" "}
                    {/* Email UTENTE */}
                    <Form.Group className="my-2">
                        <Form.Label className="m-auto" htmlFor="nomeEsercizioInput">
                            Email Utente{" "}
                        </Form.Label>
                        <Form.Control
                            style={{ width: "71%" }}
                            type="text"
                            id="nomeEsercizioInput"
                            aria-describedby="nomeEsercizioInput"
                            // value={datiEsercizio && datiEsercizio.nomeEsercizio}
                            // onChange={(e) =>
                            //     dispatch(
                            //         salvaDatiEsercizio({
                            //             ...datiEsercizio,
                            //             nomeEsercizio: e.target.value,
                            //         })
                            //     )
                            // }
                        />
                    </Form.Group>
                </div>

                <div>
                    {/* easteregg torvato BOOL */}
                    <Form.Group className="my-3">
                        {" "}
                        <Form.Check
                            className="m-auto"
                            type="switch"
                            label="EasterEgg trovato?"
                            id="EsercizioForza"
                            // checked={datiEsercizio && datiEsercizio.IsStrength}
                            // onChange={(e) =>
                            //     dispatch(
                            //         salvaDatiEsercizio({
                            //             ...datiEsercizio,
                            //             IsStrength: e.target.checked,
                            //         })
                            //     )
                            // }
                        />
                    </Form.Group>
                </div>

                <div>
                    {/* data inizio abbonamento  */}
                    <Form.Group className="my-2">
                        <Form.Label className="m-auto" htmlFor="inputRecuperoEsercizio">
                            Data inizio Abbonamento:
                        </Form.Label>
                        <Form.Control
                            style={{ width: "71%" }}
                            type="number"
                            id="inputRecuperoEsercizio"
                            aria-describedby="inputRecuperoEsercizio"
                            // value={datiEsercizio && datiEsercizio.TempoRecupero}
                            // onChange={(e) =>
                            //     dispatch(
                            //         salvaDatiEsercizio({
                            //             ...datiEsercizio,
                            //             TempoRecupero: e.target.value,
                            //         })
                            //     )
                            // }
                        />
                    </Form.Group>

                    {/* data fine abbonamento */}
                    <Form.Group className="my-2">
                        <Form.Label className="m-auto" htmlFor="inputSerieEsercizio">
                            Data fine Abbonamento:
                        </Form.Label>
                        <Form.Control
                            style={{ width: "71%" }}
                            type="number"
                            id="inputSerieEsercizio"
                            aria-describedby="inputSerieEsercizio"
                            // value={datiEsercizio && datiEsercizio.Serie}
                            // onChange={(e) =>
                            //     dispatch(
                            //         salvaDatiEsercizio({
                            //             ...datiEsercizio,
                            //             Serie: e.target.value,
                            //         })
                            //     )
                            // }
                        />
                    </Form.Group>
                </div>
                <div className="d-flex gap-3">
                    {" "}
                    <Button
                        // onClick={() => dispatch(isModaleModificaEsercizioVisible(false))}
                        type="submit"
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                    >
                        Modifica Utente Selezionato
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default FormModificaUtente;
