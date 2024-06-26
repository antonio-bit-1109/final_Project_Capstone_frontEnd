import { useEffect } from "react";
import { ShowStoricoAcquisti } from "../../../redux/actions/prodottiFetch";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { LocalHostPath } from "../../../functions/localHostPath";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";

const StoricoAcquisti = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { prodottiAcquistati } = useSelector((store) => store.prodotti);
    console.log("prodottiAcquistati", prodottiAcquistati);

    useEffect(() => {
        dispatch(ShowStoricoAcquisti(TuttiDettagliUtenteLoggato.idUtente));
    }, [dispatch, TuttiDettagliUtenteLoggato]);

    return (
        <div className="Bg-sfondo-dark min-vh-100">
            <Container>
                <Row>
                    <Col>
                        <div className="my-1">
                            <Button
                                onClick={() => navigate("/ModificaDatiUtente")}
                                variant="transparent"
                                className="rounded-4 text-light fw-bolder"
                            >
                                {" "}
                                <ArrowLeft size={100} />
                            </Button>
                        </div>
                    </Col>
                </Row>
                {prodottiAcquistati && prodottiAcquistati.length === 0 && (
                    <Row>
                        <Col>
                            <div className="my-5">
                                {" "}
                                <h2 className="display-3 text-light">Non hai ancora effettuato nessun acquisto.</h2>
                            </div>
                        </Col>
                    </Row>
                )}
                <Row className="justify-content-sm-center">
                    {prodottiAcquistati && prodottiAcquistati.length > 0 && (
                        <>
                            <div className="d-flex justify-content-center text-light display-3">
                                Storico acquisti :{" "}
                            </div>
                            {prodottiAcquistati.map((prod, i) => (
                                <Col key={`hello-${i}`} xs="12" sm="12" md="10" lg="6" xl="6">
                                    <Card
                                        className=" d-flex  flex-row rounded rounded-5 my-4 p-3 position-relative shadow-lg  border border-2 
                                        effettoVetro text-light scalaAnimazione gap-4"
                                    >
                                        <img
                                            style={{ height: "100px", width: "100px" }}
                                            className="img-fluid rounded-3 object-fit-cover"
                                            src={`${LocalHostPath}/img-prodotti/${prod.immagineProdotto}`}
                                            alt="img prodotto acquistato "
                                        />

                                        <div className="my-1 text-light">
                                            <p className="m-auto">Acquistato il:</p>
                                            <span className="fs-5">
                                                <div>
                                                    {new Date(prod.dataAcquisto).toLocaleString("it-IT").slice(0, 9)}
                                                </div>
                                                <div>{`alle ore : ${new Date(prod.dataAcquisto)
                                                    .toLocaleString("it-IT")
                                                    .slice(10, 15)} `}</div>
                                            </span>{" "}
                                        </div>
                                        <div className="d-flex">
                                            <div>
                                                <p className="fs-3">{prod.nomeProdotto}</p>
                                                <p className="fs-3"> Prezzo Singolo : {prod.prezzoProdotto} € </p>
                                                <p className="fs-3"> Unità Acquistate : {prod.quantita}</p>
                                                <p className="fs-3">
                                                    {" "}
                                                    Prezzo Totale : {prod.prezzoTotaleTransazione} €
                                                </p>
                                            </div>
                                        </div>
                                        {/* <img
                                            className="img-fluid rounded-3"
                                            src={`${LocalHostPath}/img-prodotti/${prod.immagineProdotto}`}
                                            alt=""
                                        />{" "} */}
                                    </Card>
                                </Col>
                            ))}
                        </>
                    )}
                </Row>
            </Container>
        </div>
    );
};

export default StoricoAcquisti;
