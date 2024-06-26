import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetProdotti } from "../../redux/actions/prodottiFetch";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { LocalHostPath } from "../../functions/localHostPath";
import { aggiungiAlcarrelloProdotti } from "../../redux/reducers/prodottiReducer";
import { toast } from "react-toastify";
// import { PlusCircleFill } from "react-bootstrap-icons";

const Prodotti = () => {
    const dispatch = useDispatch();
    // const [show, setShow] = useState(false);
    // const [ImmagineProdotto, setImmagineProdotto] = useState(null);
    const { listaProdotti } = useSelector((store) => store.prodotti);
    // const { TuttiDettagliUtenteLoggato } = useSelector((store) => store.utenti);
    // const [idProdottoELiminare, setIdProdottoELiminare] = useState(null);
    // const {
    //     register,
    //     handleSubmit,
    //     formState: { errors },
    //     // watch,
    //     reset,
    // } = useForm();

    // const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    // const [showModalDelete, setShowModalDelete] = useState(false);

    // const handleCloseModalDelete = () => setShowModalDelete(false);
    // const handleShowModalDelete = () => setShowModalDelete(true);

    // const HandleSubmitting = (data) => {
    //     console.log(data);
    //     handleClose();

    //     const formData = new FormData();
    //     formData.append("immagineProdotto", ImmagineProdotto);

    //     dispatch(CreaNuovoProdotto(LocalHostPath, data, formData));
    //     reset();
    // };

    // const eraseProduct = (id) => {
    //     dispatch(cancellaProdotto(LocalHostPath, id));
    //     handleCloseModalDelete();
    // };

    useEffect(() => {
        dispatch(GetProdotti());
    }, [dispatch]);

    return (
        <div className="Bg-sfondo-dark min-vh-100">
            <Container>
                <Row>
                    <Col xs="12">
                        {" "}
                        <div className="h-100 d-flex align-items-center justify-content-center">
                            <h1 className="text-light display-5 my-3 text-center">Prodotti Disponibili </h1>{" "}
                        </div>
                    </Col>
                </Row>
                {/* <Row>
                    
                    {/* {TuttiDettagliUtenteLoggato && TuttiDettagliUtenteLoggato.ruolo === "admin" ? (
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
                    ) : null} */}
                {/* </Row>  */}
                <Row className="justify-content-center">
                    {listaProdotti &&
                        listaProdotti.map((prodotto, index) => (
                            <Col key={index} xs="12" md="8" lg="6" xl="4">
                                <Card className="rounded rounded-5 my-4 p-3 position-relative shadow-lg custom-h border border-2 effettoVetro text-light scalaAnimazione">
                                    {/* {TuttiDettagliUtenteLoggato && TuttiDettagliUtenteLoggato.ruolo === "admin" ? (
                                        <Button
                                            // onClick={() => eraseProduct(prodotto.idProdotto)}
                                            onClick={() => {
                                                handleShowModalDelete(), setIdProdottoELiminare(prodotto.idProdotto);
                                            }}
                                            className="custom-position"
                                            variant="transparent"
                                        >
                                            <X className="fs-1 text-danger" />
                                        </Button>
                                    ) : null} */}

                                    <div className="d-flex h-100 justify-content-center align-items-center">
                                        {" "}
                                        <Card.Img
                                            className="m-auto"
                                            style={{ maxHeight: "250px", objectFit: "contains", maxWidth: "300px" }}
                                            variant="img-top"
                                            src={`${LocalHostPath}/img-prodotti/${prodotto.immagineProdotto}`}
                                        />
                                    </div>

                                    <Card.Body className="d-flex justify-content-end flex-column">
                                        <Card.Title className="d-flex justify-content-center fw-bold fs-3">
                                            {prodotto.nomeProdotto}
                                        </Card.Title>

                                        <Card.Text
                                            style={{ height: "60px" }}
                                            className="d-flex justify-content-center fs-5 overflow-y-auto"
                                        >
                                            {prodotto.descrizione}
                                        </Card.Text>
                                        <Card.Text>
                                            {" "}
                                            {/* <span className="fw-semibold fs-4">Prezzo:</span> */}
                                            <span className="fw-semibold display-4 ms-2">
                                                {prodotto.prezzoProdotto} €
                                            </span>
                                        </Card.Text>
                                        <Button
                                            onClick={() => {
                                                dispatch(aggiungiAlcarrelloProdotti(prodotto));
                                                toast.success("Prodotto aggiunto al carrello", {
                                                    position: "top-center",
                                                    autoClose: 2000,
                                                });
                                            }}
                                            variant="warning text-light"
                                            className="rounded-4 text-warning border-warning fw-bold"
                                        >
                                            Aggiungi al carrello{" "}
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                </Row>
                {/* <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crea Nuovo Prodotto </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleSubmit(HandleSubmitting)}>
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
                                {errors.nomeProdotto && (
                                    <div className="text-danger">{errors.nomeProdotto.message}</div>
                                )}
                            </div>
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
                </Modal>  */}
            </Container>
            {/* <Modal show={showModalDelete} onHide={() => handleCloseModalDelete()}>
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
                        onClick={() => eraseProduct(idProdottoELiminare)}
                    >
                        Elimina Definitivamente
                    </Button>
                </Modal.Footer>
            </Modal> */}
        </div>
    );
};

export default Prodotti;
