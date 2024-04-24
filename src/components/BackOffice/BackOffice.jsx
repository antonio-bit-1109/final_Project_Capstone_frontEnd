import { Button, Card, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { CreaNuovoProdotto, GetProdotti, cancellaProdotto, modificaProdotto } from "../../redux/actions/prodottiFetch";
import { LocalHostPath } from "../../functions/localHostPath";
import { PlusCircleFill, X, PenFill } from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const BackOffice = () => {
    const dispatch = useDispatch();

    const { listaProdotti } = useSelector((store) => store.prodotti);
    const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    const [ImmagineProdotto, setImmagineProdotto] = useState(null);
    const [immagineProdottoModifica, setImmagineProdottoModifica] = useState(null);

    const [showModalDelete, setShowModalDelete] = useState(false);
    const [idProdotto, setIdProdotto] = useState(null);
    const [show, setShow] = useState(false);
    // const [showDiv, setShowDiv] = useState(false);
    const [showModalEditProdotto, setShowModalEditProdotto] = useState(false);
    // const [idProdottoDaModificare, setIdProdottoDaModificare] = useState(null);

    useEffect(() => {
        dispatch(GetProdotti());
    }, [dispatch]);

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);

    const handleCloseModalEditprodotto = () => setShowModalEditProdotto(false);
    const handleShowModalEditprodotto = () => setShowModalEditProdotto(true);

    const handleCloseModalDelete = () => setShowModalDelete(false);
    const handleShowModalDelete = () => setShowModalDelete(true);

    const eraseProduct = (id) => {
        dispatch(cancellaProdotto(LocalHostPath, id));
        handleCloseModalDelete();
    };

    // SUBMIT CREAZIONE PRODOTTO
    const HandleSubmittingCreazioneProdotto = (data) => {
        console.log(data);
        handleClose();

        const formData = new FormData();
        formData.append("immagineProdotto", ImmagineProdotto);

        dispatch(CreaNuovoProdotto(LocalHostPath, data, formData));
        reset();
    };

    // SUBMIT MODIFICA PRODOTTO
    const HandleSubmittingModificaProdotto = (data2) => {
        console.log(data2);
        handleCloseModalEditprodotto();

        const formData2 = new FormData();
        formData2.append("immagineProdottoModifica", immagineProdottoModifica);
        dispatch(modificaProdotto(idProdotto, LocalHostPath, data2, formData2));
        reset2();
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        // watch,
        reset,
    } = useForm();

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: errors2 },
        reset: reset2,
    } = useForm();

    return (
        <div className="Bg-sfondo-dark altezza-sfondo">
            <Container>
                <Row>
                    <Col xs={TuttiDettagliUtenteLoggato && TuttiDettagliUtenteLoggato.ruolo !== "admin" ? "12" : "10"}>
                        {" "}
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <h1 className="text-light display-5 my-3 text-center"> BackOffice </h1>{" "}
                        </div>
                    </Col>
                    {TuttiDettagliUtenteLoggato && TuttiDettagliUtenteLoggato.ruolo === "admin" ? (
                        <Col xs="2">
                            {" "}
                            <div className="d-flex flex-column align-items-center my-3">
                                <Button onClick={handleShow} variant="transparent">
                                    <PlusCircleFill
                                        color="white"
                                        style={{ Height: "56px", Width: "56px" }}
                                        className="display-4"
                                    />{" "}
                                    <p className="mt-2 text-light">Aggiungi Prodotto</p>
                                </Button>
                            </div>
                        </Col>
                    ) : null}
                </Row>
                <Row>
                    <Col>
                        <div className="d-flex gap-3 mb-3">
                            <Button
                                // onClick={() => setShowDiv(!showDiv)}
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                            >
                                {" "}
                                Prodotti{" "}
                            </Button>
                            <Button variant="warning " className="rounded-4 text-light fw-bold">
                                {" "}
                                Esercizi{" "}
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <div>
                        {listaProdotti &&
                            listaProdotti.map((prodotto, index) => (
                                <Col key={index} xs="12" md="8" lg="8" xl="5">
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

                    <Col></Col>
                </Row>
            </Container>

            {/* MODALE ELIMINA PRODOTTO */}
            <Modal show={showModalDelete} onHide={() => handleCloseModalDelete()}>
                <Modal.Header closeButton>
                    <Modal.Title>Elimina Prodotto </Modal.Title>
                </Modal.Header>
                <Modal.Body>Stai per eliminare il Prodotto Selezionato, Vuoi continuare ?</Modal.Body>
                <Modal.Footer>
                    <Button
                        variant="light"
                        className="rounded-4 text-warning border-warning fw-bold"
                        onClick={handleCloseModalDelete}
                    >
                        Chiudi
                    </Button>
                    <Button
                        variant="warning "
                        className="rounded-4 text-light fw-bold"
                        onClick={() => eraseProduct(idProdotto)}
                    >
                        Elimina Definitivamente
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* MODALE CREA NUOVO PRODOTTO */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Crea Nuovo Prodotto </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* form creazione prodotti  */}
                    <Form onSubmit={handleSubmit(HandleSubmittingCreazioneProdotto)}>
                        {/* nome */}
                        <div className="my-2">
                            <Form.Label htmlFor="nomeProdotto">Nome Prodotto</Form.Label>
                            <Form.Control
                                {...register("nomeProdotto", {
                                    required: "Inserisci un nome per il prodotto da aggiungere.",
                                })}
                                type="text"
                                id="nomeProdotto"
                                aria-describedby="nome del prodotto "
                            />
                            {errors.nomeProdotto && <div className="text-danger">{errors.nomeProdotto.message}</div>}
                        </div>
                        {/* prezzo */}
                        <div className="my-2">
                            <Form.Label htmlFor="prezzoProdotto">Prezzo Prodotto</Form.Label>
                            <Form.Control
                                {...register("PrezzoProdotto", {
                                    required: "inserisci un prezzo per il prodotto.",
                                })}
                                type="number"
                                id="prezzoProdotto"
                                aria-describedby="prezzoProdotto"
                            />
                            {errors.PrezzoProdotto && (
                                <div className="text-danger">{errors.PrezzoProdotto.message}</div>
                            )}
                        </div>
                        {/* immagine */}
                        <div className="my-2">
                            <Form.Label htmlFor="ImmagineProdotto">Immagine Prodotto</Form.Label>
                            <Form.Control
                                onChange={(e) => setImmagineProdotto(e.target.files[0])}
                                type="file"
                                accept="image/*"
                                id="ImmagineProdotto"
                                aria-describedby="ImmagineProdotto"
                            />
                        </div>
                        {/* descrizione */}
                        <div className="my-2">
                            <Form.Label htmlFor="descrizione">Descrizione</Form.Label>
                            <Form.Control
                                {...register("descrizione", {
                                    required: "inserisci una descrizione.",
                                })}
                                type="text"
                                id="descrizione"
                                aria-describedby="descrizione prodotto "
                            />
                            {errors.descrizione && <div className="text-danger">{errors.descrizione.message}</div>}
                        </div>
                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={handleClose}
                            >
                                Chiudi
                            </Button>
                            <Button type="submit" variant="warning " className="rounded-4 text-light fw-bold">
                                Crea Prodotto
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* MODALE MODIFICA PRODOTTO */}
            <Modal show={showModalEditProdotto} onHide={handleCloseModalEditprodotto}>
                <Modal.Header closeButton>
                    <Modal.Title>Modifica Prodotto Selezionato</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit2(HandleSubmittingModificaProdotto)}>
                        <Form.Group className="mb-3" controlId="nomeprodotto">
                            <Form.Label>Nome</Form.Label>
                            <Form.Control
                                {...register2("ProdottoNome", {
                                    required: false,
                                })}
                                type="text"
                                placeholder="nuovo nome prodotto"
                            />
                            {errors2.ProdottoNomeModificato && (
                                <div className="text-danger">{errors.ProdottoNomeModificato.message}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="prezzoprodotto">
                            <Form.Label>Prezzo</Form.Label>
                            <Form.Control
                                {...register2("prodottoPrezzo", {
                                    required: false,
                                })}
                                type="number"
                                placeholder="nuovo prezzo Prodotto"
                            />
                            {errors2.prodottoPrezzoModificato && (
                                <div className="text-danger">{errors.prodottoPrezzoModificato.message}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="descrizioneprodotto">
                            <Form.Label>Descrizione</Form.Label>
                            <Form.Control
                                {...register2("ProdottoDescrizione", {
                                    required: false,
                                })}
                                type="text"
                                placeholder="nuova descrizione prodotto"
                            />
                            {errors2.ProdottoDescrizioneModificato && (
                                <div className="text-danger">{errors.ProdottoDescrizioneModificato.message}</div>
                            )}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="immagine">
                            <Form.Label>Immagine</Form.Label>
                            <Form.Control
                                type="file"
                                accept="image/*"
                                placeholder="inserisci nuova immagine"
                                onChange={(e) => setImmagineProdottoModifica(e.target.files[0])}
                            />
                        </Form.Group>
                        <Modal.Footer>
                            <Button
                                variant="light"
                                className="rounded-4 text-warning border-warning fw-bold"
                                onClick={handleCloseModalEditprodotto}
                            >
                                Chiudi
                            </Button>
                            <Button type="submit" variant="warning " className="rounded-4 text-light fw-bold">
                                Salva Modifiche
                            </Button>
                        </Modal.Footer>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default BackOffice;
