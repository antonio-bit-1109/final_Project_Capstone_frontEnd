import { Button, Card, Col } from "react-bootstrap";
import { PenFill, X } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { LocalHostPath } from "../../../functions/localHostPath";

const DivMapEsercizi = () => {
    const { listaTuttiEsercizi } = useSelector((store) => store.esercizi);

    return (
        <Col xs="12" sm="12" md="11" lg="7">
            <div className="d-md-flex flex-md-wrap justify-content-md-center d-lg-block">
                {" "}
                {listaTuttiEsercizi &&
                    listaTuttiEsercizi.map((esercizio, index) => (
                        <>
                            {" "}
                            <Col key={`the good - ${index}`} xs="12" sm="12" md="11" lg="10">
                                <div className="d-md-flex flex-md-wrap justify-content-md-center d-lg-block">
                                    <Card
                                        style={{ height: "90%" }}
                                        className="rounded rounded-5 my-4 shadow-lg effettoVetro text-light border border-2 p-4 mx-1"
                                    >
                                        <div className="d-flex justify-content-end">
                                            <Button className="me-2" variant="transparent">
                                                <X className="fs-1 text-danger" />
                                            </Button>
                                            <Button variant="transparent">
                                                <PenFill className="fs-5 text-white" />
                                            </Button>
                                        </div>

                                        <div className="d-flex align-items-center">
                                            <Card.Img
                                                className="my-3"
                                                style={{
                                                    height: "200px",
                                                    objectFit: "contain",
                                                    width: "200px",
                                                }}
                                                variant="img-top"
                                                src={`${LocalHostPath}/img-esercizi/${esercizio.immagineEsercizio}`}
                                            />

                                            <div className="ms-4">
                                                <Card.Title className="fw-bold fs-2">
                                                    {esercizio.nomeEsercizio}
                                                </Card.Title>

                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Descrizione:</strong> {esercizio.descrizioneEsercizio}
                                                </Card.Text>

                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Parte del corpo allenata:</strong>{" "}
                                                    {esercizio.parteDelCorpoAllenata}
                                                </Card.Text>

                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Ripetizioni:</strong> {esercizio.ripetizioni}
                                                </Card.Text>

                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Serie:</strong> {esercizio.serie}
                                                </Card.Text>

                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Tempo di recupero:</strong> {esercizio.tempoRecupero}
                                                </Card.Text>

                                                <Card.Text className="fs-5 my-2">
                                                    <strong>MET:</strong> {esercizio.met}
                                                </Card.Text>
                                                <Card.Text className="fs-5 my-2">
                                                    <strong>Difficoltà Esercizio:</strong> {esercizio.difficolta}
                                                </Card.Text>
                                            </div>
                                        </div>
                                    </Card>
                                </div>
                            </Col>
                        </>
                    ))}
            </div>
        </Col>
    );
};

export default DivMapEsercizi;
