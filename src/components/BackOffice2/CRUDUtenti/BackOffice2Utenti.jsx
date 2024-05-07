import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const BackOffice2Utenti = () => {
    const navigate = useNavigate();
    return (
        <div className="Bg-sfondo-dark altezza-sfondo">
            <Container>
                <Row>
                    <Col xs="12">
                        {" "}
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <h1 className="text-light display-2 my-3 text-center"> BackOffice </h1>{" "}
                        </div>
                    </Col>

                    {/* BOTTONI SCELTA CATEGORIA */}
                    <Col xs="12">
                        <div className="d-flex gap-3 mb-3">
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice");
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Prodotti{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice/Esercizio");
                                }}
                                variant="warning "
                                className="rounded-4 text-light fw-bold"
                            >
                                {" "}
                                Esercizi{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice/Utenti");
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Utenti
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default BackOffice2Utenti;
