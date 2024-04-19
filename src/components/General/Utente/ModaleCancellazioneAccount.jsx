import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { CancellaAccount } from "../../../redux/actions/fetchUtenti";

// eslint-disable-next-line react/prop-types
const ModaleCancellazioneAccount = ({ modaleCancellaAccountIsVisible, HandleCloseModale }) => {
    const dispatch = useDispatch();
    const [password, setPassword] = useState("");
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);

    useEffect(() => {
        setPassword("");
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Password:", password);
        dispatch(CancellaAccount(password, TuttiDettagliUtenteLoggato.idUtente));
    };

    return (
        <>
            {/* MODALE PER CONFERMA CANCELLAZIONE ACCOUNT  */}
            <Modal show={modaleCancellaAccountIsVisible} onHide={HandleCloseModale}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Cancellazione Account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4 className="text-warning">
                        Sei Sicuro di voler eliminare il tuo account ? Questa azione non è reversibile.
                    </h4>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="my-3" controlId="email">
                            <Form.Label className="fs-1 fw-normal m-auto">Conferma Password</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control
                                    type="password"
                                    placeholder="Inserisci la Password Corrente."
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                />
                            </div>
                        </Form.Group>{" "}
                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={HandleCloseModale}
                            >
                                Chiudi
                            </Button>
                            <Button
                                type="submit"
                                variant="warning "
                                className="rounded-4 text-light fw-bold"
                                onClick={HandleCloseModale}
                            >
                                Invia
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModaleCancellazioneAccount;
