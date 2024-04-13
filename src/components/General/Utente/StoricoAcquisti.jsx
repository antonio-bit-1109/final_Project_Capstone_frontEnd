import { useEffect } from "react";
import { ShowStoricoAcquisti } from "../../../redux/actions/prodottiFetch";
import { useDispatch, useSelector } from "react-redux";
import { Col, Container, Row } from "react-bootstrap";

const StoricoAcquisti = () => {
    const dispatch = useDispatch();

    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { prodottiAcquistati } = useSelector((store) => store.prodotti);
    console.log("prodottiAcquistati", prodottiAcquistati);

    useEffect(() => {
        dispatch(ShowStoricoAcquisti(TuttiDettagliUtenteLoggato.idUtente));
    }, []);

    return (
        <Container>
            <Row>
                <Col xs="12" sm="12" md="10" lg="6" xl="4">
                    {prodottiAcquistati &&
                        prodottiAcquistati.map((prod, i) => (
                            <div className=" border border-1" key={i}>
                                <p>{prod.nomeProdotto}</p>
                                <p>{prod.prezzoProdotto}</p>
                                <p>{prod.quantita}</p>
                                <p>{prod.dataAcquisto}</p>
                                <p>{prod.immagineProdotto}</p>
                                <p>{prod.prezzoTotaleTransazione}</p>
                            </div>
                        ))}
                </Col>
            </Row>
        </Container>
    );
};

export default StoricoAcquisti;
