import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { GetProdotti } from "../../redux/actions/prodottiFetch";
import { LocalHostPath } from "../../functions/localHostPath";
import { PlusCircleFill, X, PenFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import ModaleModificaProdottoBackOffice from "./ModaleModificaProdottoBackOffice";
import ModaleEliminaProdottoBackOffice from "./ModaleEliminaProdottoBackOffice";
import ModaleCreaNuovoProdottoBackOffice from "./ModaleCreaNuovoProdottoBackOffice";
import { GetAllEsercizi } from "../../redux/actions/fetchEsercizi";
import ModaleCreazioneNuovoEsercizio from "./ModaleCreazioneNuovoEsercizio";
import ModaleDeleteEsercizio from "./ModaleDeleteEsercizio";

const BackOffice = () => {
    const dispatch = useDispatch();

    const { listaProdotti } = useSelector((store) => store.prodotti);
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const { listaTuttiEsercizi } = useSelector((store) => store.esercizi);
    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idProdotto, setIdProdotto] = useState(null);
    const [show, setShow] = useState(false);
    const [showDivProdotti, setShowDivProdotti] = useState(true);
    const [showDivEsercizi, setShowDivEsercizi] = useState(false);
    const [showModalEditProdotto, setShowModalEditProdotto] = useState(false);
    const [showCreateEsercizio, setShowCreateEsercizio] = useState(false);
    const [showModaldeleteEsercizio, setShowModaldeleteEsercizio] = useState(false);
    const [idEsercizio, setIdEsercizio] = useState(null);
    const [DatiProdotto, setDatiprodotto] = useState({
        ProdottoNome: null,
        prodottoPrezzo: null,
        ProdottoDescrizione: null,
    });

    useEffect(() => {
        dispatch(GetProdotti());
    }, [dispatch]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCloseModalEditprodotto = () => setShowModalEditProdotto(false);
    const handleShowModalEditprodotto = () => setShowModalEditProdotto(true);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    const handleShowCreateEsercizio = () => setShowCreateEsercizio(true);

    const handleCloseModalDeleteEsercizio = () => setShowModaldeleteEsercizio(false);
    const handleShowModalDeleteEsercizio = () => setShowModaldeleteEsercizio(true);

    return (
        <div className="Bg-sfondo-dark altezza-sfondo">
            <Container>
                <Row>
                    <Col xs="12">
                        {" "}
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <h1 className="text-light display-2 my-3 text-center"> BackOffice </h1>{" "}
                        </div>
                    </Col>
                    {TuttiDettagliUtenteLoggato && TuttiDettagliUtenteLoggato.ruolo === "admin" ? (
                        <>
                            {" "}
                            {showDivProdotti && (
                                <Col xs="6" sm="5" md="2">
                                    {" "}
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
                                </Col>
                            )}
                            {showDivEsercizi && (
                                <Col xs="6" sm="5" md="2">
                                    <div className="d-flex flex-column align-items-center my-3">
                                        <Button
                                            onClick={handleShowCreateEsercizio}
                                            variant="transparent"
                                            className=" text-light d-flex flex-column align-items-center"
                                        >
                                            <PlusCircleFill
                                                color="white"
                                                style={{ Height: "70px", Width: "70px" }}
                                                className="display-4"
                                            />{" "}
                                            <p className="mt-1">Inserisci Nuovo Esercizio </p>
                                        </Button>
                                    </div>
                                </Col>
                            )}
                        </>
                    ) : null}
                </Row>
                <Row>
                    <Col>
                        <div className="d-flex gap-3 mb-3">
                            <Button
                                onClick={() => {
                                    setShowDivEsercizi(false);
                                    setShowDivProdotti(true);
                                }}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Prodotti{" "}
                            </Button>
                            <Button
                                onClick={() => {
                                    setShowDivEsercizi(true);
                                    setShowDivProdotti(false);
                                    dispatch(GetAllEsercizi());
                                }}
                                variant="warning "
                                className="rounded-4 text-light fw-bold"
                            >
                                {" "}
                                Esercizi{" "}
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    {/* DIV PRODOTTI */}
                    <div className={`${showDivProdotti ? "d-block scrollBar2" : "d-none"}`}>
                        {listaProdotti &&
                            listaProdotti.map((prodotto, index) => (
                                <Col key={index} xs="12" md="9" lg="8" xl="6">
                                    <Card className="rounded rounded-5 my-2 d-flex align-items-center flex-row shadow-lg effettoVetro text-light border border-2 p-5">
                                        <div>
                                            {" "}
                                            <Button
                                                onClick={() => {
                                                    handleShowModalDelete(), setIdProdotto(prodotto.idProdotto);
                                                }}
                                                className="custom-position"
                                                variant="transparent"
                                            >
                                                <X className="fs-1 text-danger" />
                                            </Button>
                                            <Button
                                                onClick={() => {
                                                    handleShowModalEditprodotto();
                                                    setIdProdotto(prodotto.idProdotto);
                                                    setDatiprodotto({
                                                        ProdottoNome: prodotto.nomeProdotto,
                                                        prodottoPrezzo: prodotto.prezzoProdotto,
                                                        ProdottoDescrizione: prodotto.descrizione,
                                                    });
                                                    // handleShowModalDelete(),
                                                    //     setIdProdottoELiminare(prodotto.idProdotto);
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

                    {/* DIV ESERCIZI */}
                    <div id="style-1" className={`${showDivEsercizi ? "d-block scrollBar" : "d-none"}`}>
                        {listaTuttiEsercizi &&
                            listaTuttiEsercizi.map((esercizio, index) => (
                                <Col key={index} xs="12" md="9" lg="8" xl="6">
                                    <Card className="rounded rounded-5 my-4 shadow-lg effettoVetro text-light border border-2 p-4">
                                        <div className="d-flex justify-content-end">
                                            <Button
                                                // onClick={() => dispatch(deleteEsercizio(esercizio.idEsercizio))}
                                                onClick={() => {
                                                    handleShowModalDeleteEsercizio();
                                                    setIdEsercizio(esercizio.idEsercizio);
                                                }}
                                                className="me-2"
                                                variant="transparent"
                                            >
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
                                            </div>
                                        </div>
                                    </Card>
                                </Col>
                            ))}
                    </div>
                </Row>
            </Container>

            <ModaleEliminaProdottoBackOffice
                idProdotto={idProdotto}
                handleCloseModalDelete={handleCloseModalDelete}
                showModalDelete={showModalDelete}
            />

            <ModaleCreaNuovoProdottoBackOffice handleClose={handleClose} show={show} />

            <ModaleModificaProdottoBackOffice
                key={idProdotto}
                idProdotto={idProdotto}
                showModalEditProdotto={showModalEditProdotto}
                handleCloseModalEditprodotto={handleCloseModalEditprodotto}
                DatiProdotto={DatiProdotto}
                setDatiprodotto={setDatiprodotto}
            />

            <ModaleCreazioneNuovoEsercizio
                showCreateEsercizio={showCreateEsercizio}
                setShowCreateEsercizio={setShowCreateEsercizio}
            />

            <ModaleDeleteEsercizio
                idEsercizio={idEsercizio}
                showModaldeleteEsercizio={showModaldeleteEsercizio}
                handleCloseModalDeleteEsercizio={handleCloseModalDeleteEsercizio}
            />
        </div>
    );
};

export default BackOffice;
