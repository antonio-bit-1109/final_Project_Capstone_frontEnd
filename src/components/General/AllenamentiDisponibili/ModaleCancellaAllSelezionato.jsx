/* eslint-disable react/prop-types */
import { Button, Modal } from "react-bootstrap";

const ModaleCancellaAllSelezionato = ({ show, handleClose, handleDelete, AllenamDacancellare }) => {
    return (
        <>
            {" "}
            {/* MODALE CANCELLA ALLENAMENTO SELEZIONATO */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cancella Allenamento Selezionato</Modal.Title>
                </Modal.Header>
                <Modal.Body>Cancellare Allenamento ? </Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold"
                        onClick={handleClose}
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => {
                            handleClose();
                            handleDelete(AllenamDacancellare);
                        }}
                    >
                        Cancella
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default ModaleCancellaAllSelezionato;
