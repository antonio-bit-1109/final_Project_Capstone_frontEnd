/* eslint-disable react/prop-types */
import { Button, Card, Col } from "react-bootstrap";
import { PenFill, X } from "react-bootstrap-icons";
import { LocalHostPath } from "../../functions/localHostPath";
import { useSelector } from "react-redux";

const DivProdotti = ({ handleShowModalDelete, setIdProdotto, handleShowModalEditprodotto, setDatiprodotto }) => {
    const { showDivProdotti } = useSelector((store) => store.backOffice);
    const { listaProdotti } = useSelector((store) => store.prodotti);
    return (
        <>
            {" "}
            {/* DIV PRODOTTI */}
            <div className={`${showDivProdotti ? "d-flex flex-wrap" : "d-none"}`}>
                {listaProdotti &&
                    listaProdotti.map((prodotto, index) => (
                        <Col key={index} xs="12" md="9" lg="8" xl="6">
                            <Card
                                style={{ height: "90%" }}
                                className="rounded rounded-5 my-2 d-flex align-items-center flex-row shadow-lg effettoVetro text-light border border-2 p-5 mx-1"
                            >
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
                                            <span className="fw-semibold fs-2 ms-2">{prodotto.prezzoProdotto} €</span>
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
        </>
    );
};

export default DivProdotti;
