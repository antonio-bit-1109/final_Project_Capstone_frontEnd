import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { rimuoviTuttoDalCArrello, setCarrelloOttimizzato } from "../../redux/reducers/prodottiReducer";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const PagamentoFallito = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { CarrelloOttimizzato } = useSelector((store) => store.prodotti);
    console.log("carrello ottimizzato", CarrelloOttimizzato);

    useEffect(() => {
        dispatch(rimuoviTuttoDalCArrello());
        dispatch(setCarrelloOttimizzato([]));
        setTimeout(() => {
            navigate("/");
        }, 4500);
    }, [dispatch]);

    return (
        <div className="Bg-sfondo-extra altezza-sfondo">
            <Container>
                <Row>
                    <Col>
                        <div className="display-5">
                            <div className="rounded rounded-5 my-4 p-5 bg-white">
                                <p>
                                    {" "}
                                    Il pagamento non è andato a buon fine. Tra pochi istanti verrai renderizzato alla
                                    home.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PagamentoFallito;
