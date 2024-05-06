import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { GetProdotti } from "../../../redux/actions/prodottiFetch";
import { getUtenti } from "../../../redux/actions/fetchUtenti";
import { GetAllEsercizi } from "../../../redux/actions/fetchEsercizi";
import { Button, Col, Container, Row } from "react-bootstrap";
import ModaleCreaNuovoProdottoBackOffice from "../../BackOffice/ModaleCreaNuovoProdottoBackOffice";
import ModaleEliminaProdottoBackOffice from "../../BackOffice/ModaleEliminaProdottoBackOffice";
import AggiungiProdotto from "./AggiungiProdotto";
import ModaleModificaProdotto from "./ModaleModificaProdotto";
import DivMapProdotti from "./DivMapProdotti";
import { useNavigate } from "react-router-dom";
import { SalvaDatiprodotto } from "../../../redux/reducers/backOffice2Reducer";

const BackOffice2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    useEffect(() => {
        dispatch(GetProdotti());
        dispatch(getUtenti());
        dispatch(GetAllEsercizi());

        return () => {
            dispatch(
                SalvaDatiprodotto({
                    nomeProdotto: "",
                    PrezzoProdotto: "",
                    DescrizioneProdotto: "",
                })
            );
        };
    }, [dispatch]);

    return (
        <div className="Bg-sfondo-dark altezza-sfondo">
            <Container>
                <Row>
                    {/* TITOLO */}
                    <Col xs="12">
                        {" "}
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <h1 className="text-light display-2 my-3 text-center"> BackOffice </h1>{" "}
                        </div>
                    </Col>

                    {/* BOTTONI SCELTA CATEGORIA */}
                    <Col xs="12">
                        <div className="d-flex gap-3 mb-3">
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice");
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Prodotti{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice/Esercizio");
                                }}
                                variant="warning "
                                className="rounded-4 text-light fw-bold"
                            >
                                {" "}
                                Esercizi{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    navigate("/BackOffice/Utenti");
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Utenti
                            </Button>
                        </div>
                    </Col>
                    <DivMapProdotti handleShowModalDelete={handleShowModalDelete} />

                    {/* FORM DI INVIO DATI  */}
                    <Col>
                        {/* DIV AGGIUNGI PRODOTTO */}
                        <div className="CustomSticky_Position">
                            <AggiungiProdotto handleShow={handleShow} />
                            <ModaleModificaProdotto />
                        </div>
                    </Col>
                </Row>
            </Container>

            <ModaleCreaNuovoProdottoBackOffice handleClose={handleClose} show={show} />
            <ModaleEliminaProdottoBackOffice
                handleCloseModalDelete={handleCloseModalDelete}
                showModalDelete={showModalDelete}
            />
        </div>
    );
};

export default BackOffice2;
