import { Button, Card, Col } from "react-bootstrap";
import { PenFill, X } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { LocalHostPath } from "../../../functions/localHostPath";
import {
    SalvaDatiprodotto,
    SetImmagineProdotto,
    isModalVisible,
    salvaIdProdotto,
} from "../../../redux/reducers/backOffice2Reducer";
import PropTypes from "prop-types";

const DivMapProdotti = ({ handleShowModalDelete }) => {
    const dispatch = useDispatch();
    const { listaProdotti } = useSelector((store) => store.prodotti);
    const { WidthWindows } = useSelector((store) => store.BackOffice2);

    const handleEdit = (prodotto) => {
        dispatch(
            SalvaDatiprodotto({
                nomeProdotto: prodotto.nomeProdotto,
                PrezzoProdotto: prodotto.prezzoProdotto,
                DescrizioneProdotto: prodotto.descrizione,
            })
        );
    };

    return (
        <>
            {" "}
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
                                        {/*i bottoni qui sotto sono apparentemente uguali ma uno (quello presente a width della finestra maggiori di 992px ) imposta i valori del prodotto selezionato nel form, pronto per l'edit , mentre il bottone modifica rendeizzato a width minori di 992px apre un modale per poi fare l'edit del prodotto. */}
                                        {/* BOTTONE WIDTH MAGGIORE 992PX */}
                                        <Button
                                            onClick={() => {
                                                handleEdit(prodotto);
                                                // setIdProdotto(prodotto.idProdotto);
                                                dispatch(salvaIdProdotto(prodotto.idProdotto));
                                                // setImmagineProdotto(null);
                                                dispatch(SetImmagineProdotto(null));
                                                console.log("i'm the bigger width button");
                                            }}
                                            className="custom-position2"
                                            variant="transparent"
                                        >
                                            {" "}
                                            <PenFill className="fs-5 text-white" />
                                        </Button>
                                        {/* BOTTONE WIDTH MINORE 992PX */}
                                        {WidthWindows < 992 && (
                                            <Button
                                                onClick={() => {
                                                    dispatch(isModalVisible(true));
                                                    handleEdit(prodotto);
                                                    // setIdProdotto(prodotto.idProdotto);
                                                    dispatch(salvaIdProdotto(prodotto.idProdotto));
                                                    // setImmagineProdotto(null);
                                                    dispatch(SetImmagineProdotto(null));
                                                    // handleEdit(prodotto);
                                                    // dispatch(salvaIdProdotto(prodotto.idProdotto));
                                                    // dispatch(SetImmagineProdotto(null));
                                                    console.log("i'm the smaller width button guy ");
                                                }}
                                                className="custom-position2"
                                                variant="transparent"
                                            >
                                                {" "}
                                                <PenFill className="fs-5 text-white" />
                                            </Button>
                                        )}
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
        </>
    );
};

export default DivMapProdotti;

DivMapProdotti.propTypes = {
    handleShowModalDelete: PropTypes.func.isRequired,
};
