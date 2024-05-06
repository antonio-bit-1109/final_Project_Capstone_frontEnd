import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProdotti, modificaProdotto } from "../../redux/actions/prodottiFetch";
import { getUtenti } from "../../redux/actions/fetchUtenti";
import { GetAllEsercizi } from "../../redux/actions/fetchEsercizi";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { PenFill, PlusCircleFill, X } from "react-bootstrap-icons";
import { LocalHostPath } from "../../functions/localHostPath";
import ModaleCreaNuovoProdottoBackOffice from "../BackOffice/ModaleCreaNuovoProdottoBackOffice";
import ModaleEliminaProdottoBackOffice from "../BackOffice/ModaleEliminaProdottoBackOffice";
import { salvaIdProdotto } from "../../redux/reducers/backOffice2Reducer";

const BackOffice2 = () => {
    const dispatch = useDispatch();

    const { listaProdotti } = useSelector((store) => store.prodotti);
    const { TuttiUtenti } = useSelector((store) => store.utenti);
    const { listaTuttiEsercizi } = useSelector((store) => store.esercizi);
    const { idProdotto } = useSelector((store) => store.BackOffice2);

    const [show, setShow] = useState(false);
    // const [idProdotto, setIdProdotto] = useState(null);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [immagineProdotto, setImmagineProdotto] = useState(null);

    const [datiprodotto, setDatiprodotto] = useState({
        nomeProdotto: "",
        PrezzoProdotto: "",
        DescrizioneProdotto: "",
    });

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    useEffect(() => {
        dispatch(GetProdotti());
        dispatch(getUtenti());
        dispatch(GetAllEsercizi());
    }, [dispatch]);

    const handleEdit = (prodotto) => {
        setDatiprodotto({
            nomeProdotto: prodotto.nomeProdotto,
            PrezzoProdotto: prodotto.prezzoProdotto,
            DescrizioneProdotto: prodotto.descrizione,
        });
    };

    const HandleSubmittingModificaProdotto = (e) => {
        e.preventDefault();
        // handleCloseModalEditprodotto();

        const formData2 = new FormData();
        formData2.append("immagineProdotto", immagineProdotto);

        // console.log(DatiProdotto);
        dispatch(modificaProdotto(idProdotto, LocalHostPath, datiprodotto, formData2));
    };

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
                                // onClick={() => {
                                //     dispatch(ShowDivProdotti_true());
                                //     dispatch(ShowDivEsercizi_false());
                                //     dispatch(ShowDivUtenti_false());
                                // }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Prodotti{" "}
                            </Button>
                            <Button
                                // onClick={() => {
                                //     dispatch(ShowDivProdotti_false());
                                //     dispatch(ShowDivEsercizi_true());
                                //     dispatch(ShowDivUtenti_false());
                                // }}
                                variant="warning "
                                className="rounded-4 text-light fw-bold"
                            >
                                {" "}
                                Esercizi{" "}
                            </Button>
                            <Button
                                // onClick={() => {
                                //     dispatch(ShowDivProdotti_false());
                                //     dispatch(ShowDivEsercizi_false());
                                //     dispatch(ShowDivUtenti_true());
                                // }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Utenti
                            </Button>
                        </div>
                    </Col>
                    {/* LISTA PRODOTTI */}
                    <Col xs="12" sm="12" md="11" lg="7">
                        <div className="d-md-flex flex-md-wrap justify-content-md-center d-lg-block">
                            {" "}
                            {listaProdotti &&
                                listaProdotti.map((prodotto, index) => (
                                    <Col key={index} xs="12" md="10" lg="9" xl="8">
                                        <Card
                                            style={{ minHeight: "200px" }}
                                            className="rounded rounded-5 my-2 d-flex align-items-center flex-row shadow-lg effettoVetro text-light border border-2 p-4 mx-1"
                                        >
                                            <div>
                                                {" "}
                                                <Button
                                                    onClick={() => {
                                                        handleShowModalDelete();
                                                        dispatch(salvaIdProdotto(prodotto.idProdotto));
                                                        // setIdProdotto(prodotto.idProdotto);
                                                    }}
                                                    className="custom-position"
                                                    variant="transparent"
                                                >
                                                    <X className="fs-1 text-danger" />
                                                </Button>
                                                <Button
                                                    onClick={() => {
                                                        handleEdit(prodotto);
                                                        // setIdProdotto(prodotto.idProdotto);
                                                        dispatch(salvaIdProdotto(prodotto.idProdotto));
                                                        setImmagineProdotto(null);
                                                    }}
                                                    className="custom-position2"
                                                    variant="transparent"
                                                >
                                                    <PenFill className="fs-5 text-white" />
                                                </Button>
                                            </div>

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
                        </div>
                    </Col>

                    {/* FORM DI INVIO DATI  */}
                    <Col>
                        {/* DIV AGGIUNGI PRODOTTO */}
                        <div className="CustomSticky_Position">
                            <div className="d-flex flex-column align-items-center my-3">
                                <Button onClick={handleShow} variant="transparent">
                                    <PlusCircleFill
                                        color="white"
                                        style={{ Height: "70px", Width: "70px" }}
                                        className="display-4"
                                    />{" "}
                                    <p className="mt-2 text-light">Aggiungi Prodotto</p>
                                </Button>
                            </div>
                            <div>
                                {" "}
                                <h3 className="text-light display-6">Modifica Prodotto Selezionato:</h3>
                            </div>
                            <div className="text-light">
                                <Form onSubmit={HandleSubmittingModificaProdotto}>
                                    <Form.Group className="mb-3" controlId="nomeprodotto">
                                        <Form.Label>Nome</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="clicca sul tasto di modifica nella card"
                                            onChange={(e) =>
                                                setDatiprodotto({
                                                    ...datiprodotto,
                                                    nomeProdotto: e.target.value,
                                                })
                                            }
                                            value={datiprodotto.nomeProdotto}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="prezzoprodotto">
                                        <Form.Label>Prezzo</Form.Label>
                                        <Form.Control
                                            type="number"
                                            placeholder="clicca sul tasto di modifica nella card"
                                            onChange={(e) =>
                                                setDatiprodotto({
                                                    ...datiprodotto,
                                                    PrezzoProdotto: e.target.value,
                                                })
                                            }
                                            value={datiprodotto.PrezzoProdotto}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="descrizioneprodotto">
                                        <Form.Label>Descrizione</Form.Label>
                                        <Form.Control
                                            type="text"
                                            placeholder="clicca sul tasto di modifica nella card"
                                            onChange={(e) =>
                                                setDatiprodotto({
                                                    ...datiprodotto,
                                                    DescrizioneProdotto: e.target.value,
                                                })
                                            }
                                            value={datiprodotto.DescrizioneProdotto}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="immagine">
                                        <Form.Label>Immagine</Form.Label>
                                        <Form.Control
                                            type="file"
                                            accept="image/*"
                                            placeholder="clicca sul tasto di modifica nella card"
                                            onChange={(e) => setImmagineProdotto(e.target.files[0])}
                                        />
                                    </Form.Group>
                                    <div>
                                        <Button
                                            type="submit"
                                            variant="warning "
                                            className="rounded-4 text-light fw-bold"
                                        >
                                            Modifica Prodotto
                                        </Button>
                                    </div>
                                </Form>
                            </div>
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
