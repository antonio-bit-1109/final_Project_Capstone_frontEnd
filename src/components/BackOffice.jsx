import { Button, Col, Container } from "react-bootstrap";

const BackOffice = () => {
    return (
        <div className="Bg-sfondo-dark altezza-sfondo">
            <Container>
                <Col xs="12" sm="12">
                    <div>
                        <Button variant="light" className="rounded-4 text-warning border-warning fw-bold">
                            {" "}
                            Prodotti{" "}
                        </Button>
                    </div>
                    VISUALIZZO I PRODOTTI E POSSO MODIFICARLI
                    <div></div>
                </Col>
                <Col>
                    <div>
                        <Button variant="warning " className="rounded-4 text-light fw-bold">
                            {" "}
                            Allenamenti{" "}
                        </Button>
                    </div>
                    VISUALIZZO GLI ALLENAMENTI E POSSO MODIFICARLI
                    <div></div>
                </Col>
            </Container>
        </div>
    );
};

export default BackOffice;
