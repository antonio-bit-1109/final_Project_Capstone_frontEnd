/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Button } from "react-bootstrap";

const ModaleCambiaImgprofilo = ({ setImmagineProfilo, show, handleSubmit, handleClose }) => {
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Cambio Immagine</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {" "}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="nuovaImmagine">
                            <Form.Label>Nuova Immagine</Form.Label>
                            <Form.Control
                                accept="image/*"
                                type="file"
                                onChange={(e) => setImmagineProfilo(e.target.files[0])}
                            />{" "}
                        </Form.Group>
                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={handleClose}
                            >
                                Chiudi
                            </Button>
                            <Button variant="warning " className="rounded-4 text-light fw-bold" type="submit">
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    );
};

export default ModaleCambiaImgprofilo;
