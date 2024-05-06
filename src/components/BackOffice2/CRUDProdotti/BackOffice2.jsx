import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProdotti } from "../../../redux/actions/prodottiFetch";
import { getUtenti } from "../../../redux/actions/fetchUtenti";
import { GetAllEsercizi } from "../../../redux/actions/fetchEsercizi";
import { Button, Col, Container, Row } from "react-bootstrap";
import ModaleCreaNuovoProdottoBackOffice from "../../BackOffice/ModaleCreaNuovoProdottoBackOffice";
import ModaleEliminaProdottoBackOffice from "../../BackOffice/ModaleEliminaProdottoBackOffice";
import AggiungiProdotto from "./AggiungiProdotto";
import DivMapProdotti from "./DivMapProdotti";
import { useNavigate } from "react-router-dom";
import { SalvaDatiprodotto, impostaWidthWindow } from "../../../redux/reducers/backOffice2Reducer";
import ModaleEditProdotto from "./ModaleEditProdotto";
import FormModificaProdotto from "./FormModificaProdotto";

const BackOffice2 = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const RefWidthWindow = useRef();

    const { WidthWindows } = useSelector((store) => store.BackOffice2);
    // const { showModale } = useSelector((store) => store.BackOffice2);
    const [show, setShow] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [display, setDisplay] = useState("");
    // const [WidthWindows, setWidthWindows] = useState(window.innerWidth);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    // TIENE TRACCIA DELLA VIEWPORT cosi da poter impostare visibile o no il form di modifica del prodotto.
    useEffect(() => {
        dispatch(GetProdotti());
        dispatch(getUtenti());
        dispatch(GetAllEsercizi());

        RefWidthWindow.current = WidthWindows;

        const handleResize = () => {
            dispatch(impostaWidthWindow(window.innerWidth));
        };

        window.addEventListener("resize", handleResize);

        return () => {
            dispatch(
                SalvaDatiprodotto({
                    nomeProdotto: "",
                    PrezzoProdotto: "",
                    DescrizioneProdotto: "",
                })
            );
            window.removeEventListener("resize", handleResize);

            dispatch(SalvaDatiprodotto(null));
        };
    }, [dispatch]);

    useEffect(() => {
        if (RefWidthWindow.current !== WidthWindows) {
            if (WidthWindows >= 992) {
                setDisplay("d-block");
            }

            if (WidthWindows < 992) {
                setDisplay("d-none");
            }
        }
    }, [WidthWindows]);

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
                    {/* quanto la width è inferiore a 992px viene renderizzato questo div per fare create e edit del prodotto */}
                    {WidthWindows < 992 && (
                        <Col>
                            <div>
                                <AggiungiProdotto handleShow={handleShow} />
                            </div>
                        </Col>
                    )}
                    <DivMapProdotti handleShowModalDelete={handleShowModalDelete} />

                    {/* FORM DI INVIO DATI  */}
                    <Col>
                        {/* DIV AGGIUNGI PRODOTTO */}
                        {/* in  base al valore dello stato display renderizzo condizionalmente il div sottostante, e si vedrà solo con width di window > 992px */}
                        <div className="CustomSticky_Position">
                            <AggiungiProdotto handleShow={handleShow} display={display} />
                            {WidthWindows > 992 && (
                                <div>
                                    <h3 className="text-light display-6">
                                        <p className="m-0">Modifica Prodotto Selezionato:</p>
                                    </h3>
                                </div>
                            )}

                            <FormModificaProdotto display={display} textColor={"text-light"} />
                        </div>
                    </Col>
                </Row>
            </Container>

            <ModaleCreaNuovoProdottoBackOffice handleClose={handleClose} show={show} />
            <ModaleEliminaProdottoBackOffice
                handleCloseModalDelete={handleCloseModalDelete}
                showModalDelete={showModalDelete}
            />

            <ModaleEditProdotto />
        </div>
    );
};

export default BackOffice2;
