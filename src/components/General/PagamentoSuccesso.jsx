import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { EmailConfermaAcquisto } from "../../redux/actions/prodottiFetch";
import { rimuoviTuttoDalCArrello, setCarrelloOttimizzato } from "../../redux/reducers/prodottiReducer";
import { useNavigate } from "react-router-dom";

const PagamentoSuccesso = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { CarrelloOttimizzato } = useSelector((store) => store.prodotti);
    const { DatiUtenteLoggato } = useSelector((store) => store.token);
    console.log("carrello ottimizzato", CarrelloOttimizzato);
    console.log("dati utente loggato", DatiUtenteLoggato);

    const [statePerCarrelloOttimizzato, setStatePerCarrelloOttimizzato] = useState(null);

    useEffect(() => {
        setStatePerCarrelloOttimizzato(CarrelloOttimizzato);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (statePerCarrelloOttimizzato) {
            // dispatch(PostProdottoAcquistato(statePerCarrelloOttimizzato));
            //invio mail per conferma acquisto all utente
            dispatch(EmailConfermaAcquisto(DatiUtenteLoggato.email, statePerCarrelloOttimizzato));
            dispatch(rimuoviTuttoDalCArrello());
            dispatch(setCarrelloOttimizzato([]));
            setTimeout(() => {
                navigate("/");
            }, 4500);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [statePerCarrelloOttimizzato, dispatch]);

    return (
        <div className="Bg-sfondo altezza-sfondo">
            <Container>
                <Row>
                    <Col>
                        <div className="display-5">
                            <div className="rounded rounded-5 my-4 p-5 bg-white">
                                <p>
                                    {" "}
                                    Il pagamento è andato a buon fine. Tra pochi istanti verrai renderizzato alla home.
                                </p>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default PagamentoSuccesso;
