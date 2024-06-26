// import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
// import { GetAbbonamenti } from "../../redux/actions/fetchAbbonamenti";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
// import { LocalHostPath } from "../../functions/localHostPath";
import trainer1 from "../../../assets/trainer33.png";
import trainer2 from "../../../assets/TRAINER.2.jpg";
import trainer3 from "../../../assets/trainer4.jpg";
import { CreaAbbonamento } from "../../../redux/actions/fetchAbbonamenti";
import { useEffect, useState } from "react";

const AbbonamentoTrainer = () => {
    const dispatch = useDispatch();

    const ListaAbbonamentiFake = [
        {
            nomeAbbonamento: "Abbonamento Standard",
            immagineAbbonamento: trainer1,
            descrizioneAbbonamento:
                "sottoscrivendo questo abbonamento avrai diritto a 10 giorni di specifiche ulteriori sui tuoi allenamenti",
            prezzoAbbonamento: 10,
            durataAbbonamento: 10,
        },
        {
            nomeAbbonamento: "Abbonamento Advanced",
            immagineAbbonamento: trainer2,
            descrizioneAbbonamento:
                "sottoscrivendo questo abbonamento avrai diritto a 15 giorni di specifiche ulteriori sui tuoi allenamenti",
            prezzoAbbonamento: 15,
            durataAbbonamento: 15,
        },
        {
            nomeAbbonamento: "Abbonamento Ultimate",
            immagineAbbonamento: trainer3,
            descrizioneAbbonamento:
                "sottoscrivendo questo abbonamento avrai diritto ad un mese di specifiche ulteriori sui tuoi allenamenti",
            prezzoAbbonamento: 20,
            durataAbbonamento: 30,
        },
    ];
    console.log("ListaAbbonamentiFake", ListaAbbonamentiFake);

    const [DatiAbbonamento, setDatiAbbonamento] = useState({
        nomeAbbonamento: null,
        description: null,
        price: null,
        durataAbbonamento: null,
    });

    const subscribeSubscription = (abbon) => {
        setDatiAbbonamento({
            nomeAbbonamento: abbon.nomeAbbonamento,
            description: abbon.descrizioneAbbonamento,
            price: abbon.prezzoAbbonamento,
            durataAbbonamento: abbon.durataAbbonamento,
        });
    };

    useEffect(() => {
        if (Object.values(DatiAbbonamento).every((elem) => elem !== null)) {
            dispatch(CreaAbbonamento(DatiAbbonamento));
        }
    }, [DatiAbbonamento, dispatch]);

    return (
        <div className="Bg-sfondo-dark min-vh-100">
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
                    {ListaAbbonamentiFake &&
                        ListaAbbonamentiFake.map((abbon, i) => (
                            <Col xs="12" sm="12" md="10" lg="6" xl="4" xxl="4" key={`ind-${i}`}>
                                <Card className="filterGrayScale scalaAnimazione d-flex flex-column custom-h my-4 rounded rounded-5 effettoVetro text-light border border-2">
                                    <Card.Img
                                        style={{ maxHeight: "300px", objectFit: "cover", objectPosition: "top" }}
                                        className="img-thumbnail rounded rounded-5"
                                        src={abbon.immagineAbbonamento}
                                    />
                                    <Card.Body>
                                        <Card.Title className="fs-3">{abbon.nomeAbbonamento}</Card.Title>
                                        <Card.Text>{abbon.descrizioneAbbonamento}</Card.Text>
                                        <Card.Text className="fw-semibold display-4 ms-2">
                                            {abbon.prezzoAbbonamento} €
                                        </Card.Text>

                                        <Button
                                            onClick={() => {
                                                subscribeSubscription(abbon);
                                            }}
                                            variant="warning"
                                            className="rounded-4 text-light fw-bold"
                                        >
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
