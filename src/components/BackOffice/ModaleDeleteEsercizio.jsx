/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteEsercizio } from "../../redux/actions/fetchEsercizi";

const ModaleDeleteEsercizio = ({ idEsercizio, showModaldeleteEsercizio, handleCloseModalDeleteEsercizio }) => {
    const dispatch = useDispatch();
    return (
        <>
            <Modal show={showModaldeleteEsercizio} onHide={handleCloseModalDeleteEsercizio}>
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
                        onClick={handleCloseModalDeleteEsercizio}
                        className="rounded-4 text-warning border-warning fw-bold"
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => {
                            handleCloseModalDeleteEsercizio();
                            dispatch(deleteEsercizio(idEsercizio));
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
