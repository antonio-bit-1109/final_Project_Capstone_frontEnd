import { useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";

// eslint-disable-next-line react/prop-types
const ModificaDatiUtente = () => {
    useEffect(() => {}, []);

    return (
        <div className="Bg-sfondo altezza-sfondo">
            {" "}
            <Container>
                <Row>
                    <Col>
                        <div>INSERISCI DATI ATTUALI</div>
                        <Form>
                            <Form.Group className="my-3" controlId="nome">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci un nuovo Nome." />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="cognome">
                                <Form.Label>Cognome</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci un nuovo cognome." />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="text" placeholder="Inserisci una nuova mail" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="vecchiaPassword">
                                <Form.Label>Vecchia Password</Form.Label>
                                <Form.Control type="password" placeholder="Inserisci la vecchia Password" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="Nuovapassword">
                                <Form.Label> Nuova Password</Form.Label>
                                <Form.Control type="password" placeholder="Inserisci una nuova Password" />
                            </Form.Group>
                            <Form.Group className="my-3" controlId="confermaNuovaPassword">
                                <Form.Label>Conferma Nuova Password</Form.Label>
                                <Form.Control type="password" placeholder="Conferma la nuova Password" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <div>INSERISCI BOTTONE PER ANNULLARE ABBONAMENTO </div>
                    <Button> Annulla Abbonamento </Button>
                    <Button> Storico acquisti </Button>
                </Row>
            </Container>{" "}
            {/* <Offcanvas
                style={{ backgroundColor: "#212529", color: "white" }}
                show={showOffCanvas}
                onHide={handleCloseCanvas}
                backdrop="static"
                scroll={true}
            >
                <Offcanvas.Header closeVariant="white" closeButton>
                    <Offcanvas.Title>Modifica Informazioni Profilo</Offcanvas.Title>
                </Offcanvas.Header>

                <Offcanvas.Body>
                    <Form>
                        <Form.Group className="my-3" controlId="nome">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci un nuovo Nome." />
                        </Form.Group>
                        <Form.Group className="my-3" controlId="cognome">
                            <Form.Label>Cognome</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci un nuovo cognome." />
                        </Form.Group>
                        <Form.Group className="my-3" controlId="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="text" placeholder="Inserisci una nuova mail" />
                        </Form.Group>
                        <Form.Group className="my-3" controlId="vecchiaPassword">
                            <Form.Label>Vecchia Password</Form.Label>
                            <Form.Control type="password" placeholder="Inserisci la vecchia Password" />
                        </Form.Group>
                        <Form.Group className="my-3" controlId="Nuovapassword">
                            <Form.Label> Nuova Password</Form.Label>
                            <Form.Control type="password" placeholder="Inserisci una nuova Password" />
                        </Form.Group>
                        <Form.Group className="my-3" controlId="confermaNuovaPassword">
                            <Form.Label>Conferma Nuova Password</Form.Label>
                            <Form.Control type="password" placeholder="Conferma la nuova Password" />
                        </Form.Group>
                    </Form>
                </Offcanvas.Body>
            </Offcanvas> */}
        </div>
    );
};

export default ModificaDatiUtente;
