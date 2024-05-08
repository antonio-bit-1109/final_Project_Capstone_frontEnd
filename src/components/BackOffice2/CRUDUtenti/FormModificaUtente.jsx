import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { salvaDatiUtente } from "../../../redux/reducers/backOffice2Reducer";
import { ModificaDatiUtente_as_admin } from "../../../redux/actions/fetchUtenti";
import PropTypes from "prop-types";
const FormModificaUtente = ({ color }) => {
    const dispatch = useDispatch();
    const { datiUtente, idUtente } = useSelector((store) => store.BackOffice2);

    const [immagineUtente, setImmagineUtente] = useState(null);

    const EditUtente = (e) => {
        e.preventDefault();
        // handleCloseMOdaleEditEsercizio();

        const formData = new FormData();
        formData.append("immagineUtente", immagineUtente);
        console.log(formData);

        // console.log(datiEsercizioMOdifica);
        dispatch(ModificaDatiUtente_as_admin(idUtente, datiUtente, formData));
        setImmagineUtente(null);
    };

    return (
        <div className={`${color}`}>
            {" "}
            <Form onSubmit={EditUtente}>
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
                            value={datiUtente && datiUtente.nomeUtente}
                            onChange={(e) => dispatch(salvaDatiUtente({ ...datiUtente, nomeUtente: e.target.value }))}
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
                            value={datiUtente && datiUtente.cognomeUtente}
                            onChange={(e) =>
                                dispatch(salvaDatiUtente({ ...datiUtente, cognomeUtente: e.target.value }))
                            }
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
                        onChange={(e) => setImmagineUtente(e.target.files[0])}
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
                                value={datiUtente && datiUtente.peso}
                                onChange={(e) => dispatch(salvaDatiUtente({ ...datiUtente, peso: e.target.value }))}
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
                                value={datiUtente && datiUtente.altezza}
                                onChange={(e) => dispatch(salvaDatiUtente({ ...datiUtente, altezza: e.target.value }))}
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
                            value={datiUtente && datiUtente.email}
                            onChange={(e) => dispatch(salvaDatiUtente({ ...datiUtente, email: e.target.value }))}
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
                            label="Bonus trovato?"
                            id="EsercizioForza"
                            checked={datiUtente && datiUtente.easterEggFounded}
                            onChange={(e) =>
                                dispatch(salvaDatiUtente({ ...datiUtente, easterEggFounded: e.target.checked }))
                            }
                        />
                    </Form.Group>
                    {/* utente premium */}
                    <Form.Group className="my-3">
                        {" "}
                        <Form.Check
                            className="m-auto"
                            type="switch"
                            label="Utente Premium?"
                            id="EsercizioForza"
                            checked={datiUtente && datiUtente.UtentePremium}
                            onChange={(e) =>
                                dispatch(salvaDatiUtente({ ...datiUtente, UtentePremium: e.target.checked }))
                            }
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
                            value={datiUtente && datiUtente.dataInizioAbbonamento}
                            onChange={(e) =>
                                dispatch(salvaDatiUtente({ ...datiUtente, dataInizioAbbonamento: e.target.value }))
                            }
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
                            value={datiUtente && datiUtente.dataFineAbbonamento}
                            onChange={(e) =>
                                dispatch(salvaDatiUtente({ ...datiUtente, dataFineAbbonamento: e.target.value }))
                            }
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

FormModificaUtente.propTypes = {
    color: PropTypes.string,
};
