/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteEsercizio } from "../../redux/actions/fetchEsercizi";
import { isModaleDeleteEsercizioVisible } from "../../redux/reducers/backOffice2Reducer";

const ModaleDeleteEsercizio = () => {
    const dispatch = useDispatch();

    const { showModaleDeleteEsercizio, idEsercizio } = useSelector((store) => store.BackOffice2);

    return (
        <>
            <Modal show={showModaleDeleteEsercizio} onHide={() => dispatch(isModaleDeleteEsercizioVisible(false))}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Cancellazione Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-warning">
                        Sei Sicuro di voler eliminare l&apos;esercizio ? Questa azione non è reversibile.
                    </h4>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        onClick={() => dispatch(isModaleDeleteEsercizioVisible(false))}
                        className="rounded-4 text-warning border-warning fw-bold"
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => {
                            // handleCloseModalDeleteEsercizio();
                            dispatch(deleteEsercizio(idEsercizio));
                            dispatch(isModaleDeleteEsercizioVisible(false));
                        }}
                    >
                        Elimina Esercizio
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModaleDeleteEsercizio;
