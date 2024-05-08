import { Button, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { deleteUtente_as_admin } from "../../redux/actions/fetchUtenti";
import { isModaleDeleteUtenteVisible } from "../../redux/reducers/backOffice2Reducer";

// eslint-disable-next-line react/prop-types
const ModaleCancellaUtente = () => {
    const dispatch = useDispatch();

    const { showModaleDeleteUtenteVisible, idUtente } = useSelector((store) => store.BackOffice2);
    return (
        <>
            <Modal show={showModaleDeleteUtenteVisible} onHide={() => dispatch(isModaleDeleteUtenteVisible(false))}>
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
                        onClick={() => dispatch(isModaleDeleteUtenteVisible(false))}
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => {
                            dispatch(isModaleDeleteUtenteVisible(false));
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
