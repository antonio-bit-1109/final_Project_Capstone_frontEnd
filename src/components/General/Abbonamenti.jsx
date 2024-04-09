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
        <div className="Bg-sfondo-extra vh-100">
            <Container>
                <Row>
                    <Col>
                        <div> Abbonamenti Disponibili:</div>
                    </Col>
                </Row>
                <Row>
                    {ListaAbbonamenti &&
                        ListaAbbonamenti.map((abbon, i) => (
                            <Col xs="12" sm="12" md="6" lg="6" xl="4" xxl="4" key={`ind-${i}`}>
                                <Card className="filterGrayScale custom-h d-flex flex-column">
                                    <Card.Img
                                        style={{ height: "70%", objectFit: "cover" }}
                                        className="img-thumbnail img-fluid"
                                        src={`${LocalHostPath}/img-trainers/${abbon.immagineAbbonamento}`}
                                    />
                                    <Card.Body>
                                        <Card.Title>{abbon.nomeAbbonamento}</Card.Title>
                                        <Card.Text>{abbon.descrizioneAbbonamento}</Card.Text>
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
