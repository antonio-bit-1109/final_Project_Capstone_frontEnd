import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetTrainers } from "../../redux/actions/fetchTrainers";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LocalHostPath } from "../../functions/localHostPath";

const AbbonamentoTrainer = () => {
    const dispatch = useDispatch();

    const { ListaTrainers } = useSelector((state) => state.trainers);
    console.log(ListaTrainers);

    useEffect(() => {
        dispatch(GetTrainers());
    }, [dispatch]);

    return (
        <>
            <Container>
                <Row>
                    <Col>
                        <div> Abbonamenti Disponibili:</div>
                    </Col>
                </Row>
                <Row>
                    {ListaTrainers &&
                        ListaTrainers.map((trainer, i) => (
                            <Col xs="12" sm="12" md="6" lg="6" xl="4" xxl="4" key={`ind-${i}`}>
                                <Card>
                                    <Card.Img
                                        className="img-thumbnail img-fluid"
                                        src={`${LocalHostPath}/img-trainers/${trainer.immagineProfilo}`}
                                    />
                                    <Card.Body>
                                        <Card.Title>
                                            {trainer.nome} {trainer.cognome}
                                        </Card.Title>
                                        <Card.Text>{trainer.qualifica}</Card.Text>
                                        <Button variant="primary">SottoScrivi Abbonamento </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
            </Container>
        </>
    );
};

export default AbbonamentoTrainer;
