/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import { LocalHostPath } from "../../../functions/localHostPath";

const ModaleMostraDettagliAllenamento = ({ showEsercizi, handleCloseEsercizi, DettagliAllenamento }) => {
    return (
        <>
            {" "}
            {/* MOSTRA DETTAGLI ALLENAMENTO SELEZIONATO */}
            <Modal show={showEsercizi} onHide={handleCloseEsercizi}>
                <Modal.Header closeButton>
                    <Modal.Title>Dettagli Allenamento</Modal.Title>
                </Modal.Header>

                {/* INSERISCI DETTAGLI DELL'ALLENAMENTO */}
                {DettagliAllenamento && (
                    <Modal.Body>
                        <h3 className="display-6">Esercizi Presenti Nell&apos;allenamento:</h3>
                        {DettagliAllenamento.esercizi.map((es, i) => (
                            <div className="w-100" key={`indice-${i}`}>
                                <img
                                    style={{ maxHeight: "300px", objectFit: "contain" }}
                                    className="w-100"
                                    src={`${LocalHostPath}/img-esercizi/${es.immagineEsercizio}`}
                                    alt="esercizio"
                                />
                                <p className="my-3 fw-semibold fs-4">
                                    - {es.nomeEsercizio} - {es.ripetizioni} x {es.serie}
                                </p>
                            </div>
                        ))}
                    </Modal.Body>
                )}

                <Modal.Footer>
                    <Button variant="warning " className="rounded-4 text-light fw-bold" onClick={handleCloseEsercizi}>
                        Chiudi
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModaleMostraDettagliAllenamento;
