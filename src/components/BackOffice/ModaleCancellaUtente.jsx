import { Button, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { deleteUtente_as_admin } from "../../redux/actions/fetchUtenti";

// eslint-disable-next-line react/prop-types
const ModaleCancellaUtente = ({ showModaleDeleteUtente, handleCloseModaleDeleteUtente, idUtente }) => {
    const dispatch = useDispatch();
    return (
        <>
            <Modal show={showModaleDeleteUtente} onHide={handleCloseModaleDeleteUtente}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancella Utente Selezionato</Modal.Title>
                </Modal.Header>
                <Modal.Body className="display-6 text-warning">
                    Stai per cancellare l&apos;utente selezionato, continuare ?{" "}
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold"
                        onClick={handleCloseModaleDeleteUtente}
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => {
                            handleCloseModaleDeleteUtente();
                            dispatch(deleteUtente_as_admin(idUtente));
                        }}
                    >
                        Elimina utente
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModaleCancellaUtente;
