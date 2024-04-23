/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { PencilSquare } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { ModificaDati } from "../../../../redux/actions/fetchUtenti";

const MOdaleConfermaPassCancellazione = ({ show, dataReactHookForm, handleClose, handleShow }) => {
    const dispatch = useDispatch();
    const [passwordInput, setPasswordInput] = useState("");
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);

    const submitCheckPassword = (e) => {
        setPasswordInput("");
        if (dataReactHookForm !== null) {
            e.preventDefault();
            dispatch(ModificaDati(passwordInput, TuttiDettagliUtenteLoggato.idUtente, dataReactHookForm));
        }
    };

    return (
        <>
            {/* MODALE PER CONFERMA PASSWORD PER MODIFICARE I DATI UTENTE  */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Conferma Password Prima di proseguire</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={submitCheckPassword}>
                        <Form.Group className="my-3" controlId="email">
                            <Form.Label className="fs-1 fw-normal m-auto">Inserisci Password</Form.Label>
                            <div className="d-flex align-items-center">
                                <Form.Control
                                    type="password"
                                    placeholder="Inserisci la Password Corrente."
                                    onChange={(e) => setPasswordInput(e.target.value)}
                                    value={passwordInput}
                                />
                                <Button onClick={handleShow} variant="transparent">
                                    <PencilSquare size={30} className="text-light" />
                                </Button>
                            </div>
                        </Form.Group>{" "}
                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={handleClose}
                            >
                                Chiudi
                            </Button>
                            <Button
                                type="submit"
                                variant="warning "
                                className="rounded-4 text-light fw-bold"
                                onClick={handleClose}
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

export default MOdaleConfermaPassCancellazione;
