import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { LocalHostPath } from "../../functions/localHostPath";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import { rimuoviTuttoDalCArrello } from "../../redux/reducers/prodottiReducer";
import { fetchWithAuth } from "../../functions/interceptor";
// import { fetchWithAuth } from "../../functions/interceptor";
import { setCarrelloOttimizzato } from "../../redux/reducers/prodottiReducer";
const Carrello = () => {
    const token = useSelector((store) => store.token.TokenUtente);
    const dispatch = useDispatch();
    const prodottiNelCarrello = useSelector((store) => store.prodotti.carrelloProdotti);
    console.log("carrello di Redux", prodottiNelCarrello);

    const stripePromise = loadStripe(
        "pk_test_51OvOuXF8RKd4FcyTpcXChaAdtZ1fn5O7yY9BDTcEQcY5tlHXiYyc96EQDtnvrJNGTX3EArS1zMT0U03sL5VJSZGf00MjrfcJkf"
    );

    const [sessionId, setSessionId] = useState("");
    console.log("id nello state", sessionId);
    const [carrello, setcarrello] = useState([]);
    console.log("carrello per la fetch", carrello);

    const [newCarrello, setNewCarrello] = useState([]);
    console.log("new carrello", newCarrello);

    useEffect(() => {
        if (prodottiNelCarrello) {
            setcarrello(prodottiNelCarrello);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // al variare di carrello creo un nuovo oggetto chiamato map,
    // se dentro l'oggetto map è gia presente un certo idprodotto allora incremento la proprietà quantità dell oggetto +1,
    // altrimenti creo un nuovo oggetto con la proprietà quantità settata a 1
    useEffect(() => {
        if (carrello.length > 0) {
            let map = {};
            for (let i = 0; i < carrello.length; i++) {
                let singoloProdotto = carrello[i];
                let idProdotto = singoloProdotto.idProdotto;
                if (map[idProdotto]) {
                    map[idProdotto].quantita += 1;
                } else {
                    map[idProdotto] = { ...singoloProdotto, quantita: 1 };
                }
            }
            let nuovoCarrello = Object.values(map);
            setNewCarrello(nuovoCarrello);
            dispatch(setCarrelloOttimizzato(nuovoCarrello));
        }
    }, [carrello, dispatch]);

    const handleClick = async () => {
        fetchWithAuth(`${LocalHostPath}/Carrello/create-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ListaItems: newCarrello,
            }),
        })
            .then((res) => res.json())
            .then(async (data) => {
                setSessionId(data.sessionId);
                console.log("session id", data.sessionId);
                console.log("token", token);
                const stripe = await stripePromise;
                const { error } = await stripe.redirectToCheckout({
                    sessionId: data.sessionId,
                });
                if (error) {
                    console.error(error);
                }
            });
    };

    return (
        <div className="Bg-sfondo-dark min-vh-100">
            <Container>
                <Row>
                    <Col>
                        <div>
                            <h1 className="text-light my-2">Il tuo Carrello:</h1>
                        </div>
                    </Col>
                </Row>

                <Row>
                    {" "}
                    {prodottiNelCarrello.length === 0 ? (
                        <h2 className="display-3 text-light">Il carrello è vuoto.</h2>
                    ) : (
                        <>
                            <div className="d-flex gap-3 align-items-center h-100">
                                <Button
                                    onClick={() => handleClick(sessionId)}
                                    variant="warning text-light"
                                    className="rounded-4 text-warning border-warning fw-bold p-2"
                                >
                                    Procedi al Pagamento{" "}
                                </Button>
                                <Button
                                    onClick={() => {
                                        dispatch(rimuoviTuttoDalCArrello()), dispatch(setCarrelloOttimizzato([]));
                                    }}
                                    variant="light"
                                    className="rounded-4 text-warning border-warning fw-bold p-2"
                                >
                                    Svuota Carrello
                                </Button>
                            </div>{" "}
                            {prodottiNelCarrello &&
                                prodottiNelCarrello.map((prodotto, index) => (
                                    <Col xs="12" md="12" lg="8" xl="8" xxl="8" key={`my-col-${index}`}>
                                        <Card className="rounded rounded-5 my-2 p-3 d-flex align-items-center flex-row shadow-lg effettoVetro text-light">
                                            <Card.Img
                                                className="me-3"
                                                style={{
                                                    maxHeight: "120px",
                                                    objectFit: "contains",
                                                    maxWidth: "120px",
                                                }}
                                                variant="img-top"
                                                src={`${LocalHostPath}/img-prodotti/${prodotto.immagineProdotto}`}
                                            />
                                            <div className="d-flex gap-4">
                                                {" "}
                                                <div>
                                                    <Card.Title className="d-flex justify-content-center fw-bold fs-3">
                                                        {prodotto.nomeProdotto}
                                                    </Card.Title>
                                                    <Card.Text>
                                                        {" "}
                                                        {/* <span className="fw-semibold fs-4">Prezzo:</span> */}
                                                        <span className="fw-semibold fs-2 ms-2">
                                                            {prodotto.prezzoProdotto} €
                                                        </span>
                                                    </Card.Text>
                                                </div>
                                                <div className="d-flex align-items-center">
                                                    <Card.Text className=" fs-5">{prodotto.descrizione}</Card.Text>
                                                </div>
                                            </div>
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

export default Carrello;
