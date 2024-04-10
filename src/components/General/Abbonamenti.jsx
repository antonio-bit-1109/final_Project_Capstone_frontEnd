import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetAbbonamenti } from "../../redux/actions/fetchAbbonamenti";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LocalHostPath } from "../../functions/localHostPath";

const AbbonamentoTrainer = () => {
    const dispatch = useDispatch();

    const { ListaAbbonamenti } = useSelector((state) => state.abbonamenti);
    console.log(ListaAbbonamenti);

    useEffect(() => {
        dispatch(GetAbbonamenti());
    }, [dispatch]);

    return (
        <div className="Bg-sfondo min-vh-100">
            <Container>
                <Row>
                    <Col>
                        <div>
                            {" "}
                            <h3 className="display-4 text-light">Abbonamenti Disponibili:</h3>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-center">
                    {ListaAbbonamenti &&
                        ListaAbbonamenti.map((abbon, i) => (
                            <Col xs="12" sm="12" md="10" lg="8" xl="4" xxl="4" key={`ind-${i}`}>
                                <Card className="filterGrayScale d-flex flex-column custom-h my-4">
                                    <Card.Img
                                        style={{ maxHeight: "300px", objectFit: "cover", objectPosition: "top" }}
                                        className="img-thumbnail"
                                        src={`${LocalHostPath}/img-trainers/${abbon.immagineAbbonamento}`}
                                    />
                                    <Card.Body>
                                        <Card.Title className="fs-3">{abbon.nomeAbbonamento}</Card.Title>
                                        <Card.Text>{abbon.descrizioneAbbonamento}</Card.Text>
                                        <Card.Text className="fw-semibold display-4 ms-2">
                                            {abbon.prezzoAbbonamento} €
                                        </Card.Text>

                                        <Button variant="warning " className="rounded-4 text-light fw-bold">
                                            Sottoscrivi Abbonamento{" "}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    );
};

export default AbbonamentoTrainer;
